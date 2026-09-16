import { useEffect, useState, useMemo } from 'react';
import Select, { components } from "react-select";
import SimpleIcon, { searchSimpleIcons } from '../../../../../Utils/simpleIcons';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import useProfileReducer from '../../../../../Hooks/useProfileReducer';
import '../Styles/TagInput.css';

const Option = (props) => (
	<components.Option {...props}>
		<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", width: "100%" }}>
			<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
				<SimpleIcon
					name={props.data.icon || props.data.slug || props.data.name}
					size="18px"
					color="var(--admin-accent)"
				/>
				<span style={{ color: "var(--admin-text-primary)", fontSize: "0.875rem" }}>
					{props.data.name || props.data.label}
				</span>
			</div>
			{props.data.isAvailable && (
				<span style={{ fontSize: "0.7rem", color: "var(--admin-accent)", background: "var(--admin-accent-soft)", padding: "1px 6px", borderRadius: "4px" }}>
					Available
				</span>
			)}
		</div>
	</components.Option>
);

const SingleValue = (props) => (
	<components.SingleValue {...props}>
		<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
			<SimpleIcon
				name={props.data.icon || props.data.slug || props.data.name}
				size="18px"
				color="var(--admin-accent)"
			/>
			<span style={{ color: "var(--admin-text-primary)", fontSize: "0.875rem" }}>
				{props.data.name || props.data.label}
			</span>
		</div>
	</components.SingleValue>
);

function NewTag({ inputs, tag, selectOptions, handleCancel, handleMore, handleDone, handleChange, setSearchQuery }) {
	const isSelect = tag.type === "select" || tag.name === "socialLinks";

	return (
		<div className="new-tag">
			<p className="label">{`New ${tag.subLabel}`}</p>

			<div className="inputs">
				{inputs.map((input, index) => (
					<div className="input" key={index}>
						{isSelect ? (
							<Select
								className="select"
								classNamePrefix="select"
								options={selectOptions}
								isSearchable={true}
								onInputChange={(val, { action }) => {
									if (action === "input-change") {
										setSearchQuery(val);
									}
								}}
								filterOption={() => true}
								placeholder={`Search available platforms or simple-icons for ${tag.subLabel}...`}
								components={{ Option, SingleValue }}
								onChange={(value) => {
									handleChange(value, index);
								}}
							/>
						) : (
							<input
								type="text"
								name={tag.subLabel}
								id={tag.subLabel}
								placeholder={`Add your ${tag.subLabel} here`}
								onChange={(e) => {
									handleChange(e.target.value, index);
								}}
							/>
						)}

						<p className="cancel" onClick={() => { handleCancel(index); }}>
							cancel
							<span className="icon">
								<CloseRoundedIcon sx={{ fontSize: '1.6vh', color: 'currentColor' }} />
							</span>
						</p>
					</div>
				))}
			</div>

			<p className="more button" onClick={handleMore}>
				<span className="icon">
					<AddRoundedIcon sx={{ fontSize: '1.6vh', color: 'currentColor' }} />
				</span>
				more
			</p>

			<p className="done button" onClick={handleDone}>
				done
				<span className="icon">
					<CheckRoundedIcon sx={{ fontSize: '1.6vh', color: 'var(--admin-text-ink)' }} />
				</span>
			</p>
		</div>
	);
}

function TagInput({ tag, values = [] }) {
        const { addSocialLinks, deleteSocialLink, updateProfile } = useProfileReducer();
        const [inputs, setInputs] = useState([]);
        const [valuesSet, setValuesSet] = useState(() => new Set(
                tag.icon ? [...(values || [])] : (values || []).map(v => typeof v === 'object' ? v.name : v)
        ));
        const [searchQuery, setSearchQuery] = useState("");

        const isSocial = tag.type === "select" || tag.name === "socialLinks";

        // Flatten available social options from tag.options
        const availableOptions = useMemo(() => {
                if (!isSocial || !tag.options) return [];
                const raw = tag.options;
                let flat = [];
                if (Array.isArray(raw)) {
                        if (raw.length > 0 && raw[0].options && Array.isArray(raw[0].options)) {
                                flat = raw[0].options;
                        } else {
                                flat = raw;
                        }
                }
                return flat.map((s) => ({
                        name: s.name,
                        label: s.name,
                        value: s.name,
                        icon: s.icon || s.name,
                        url: s.url || `https://${(s.icon || s.name || '').toLowerCase()}.com`,
                        isAvailable: true,
                }));
        }, [isSocial, tag.options]);

        // Combined select options (Available Social Links + Simple Icons Online Search)
        const selectOptions = useMemo(() => {
                if (!isSocial) {
                        return tag.options || [];
                }

                const q = searchQuery.trim().toLowerCase();
                const matchedAvailable = availableOptions.filter(
                        (opt) => !q || opt.name.toLowerCase().includes(q) || (opt.icon && opt.icon.toLowerCase().includes(q))
                );

                const simpleIconResults = searchSimpleIcons(searchQuery, 25);
                const matchedIcons = simpleIconResults.filter(
                        (icon) => !matchedAvailable.some((r) => r.name.toLowerCase() === icon.name.toLowerCase())
                );

                if (q) {
                        const groups = [];
                        if (matchedAvailable.length > 0) {
                                groups.push({ label: "Available Platforms", options: matchedAvailable });
                        }
                        if (matchedIcons.length > 0) {
                                groups.push({ label: "Simple Icons Library", options: matchedIcons });
                        }
                        return groups.length > 0 ? groups : matchedIcons;
                }

                return [
                        ...(matchedAvailable.length > 0 ? [{ label: "Available Platforms", options: matchedAvailable }] : []),
                        { label: "Popular Platforms", options: matchedIcons }
                ];
        }, [isSocial, tag.options, searchQuery, availableOptions]);

        const handleAdd = () => {
                setInputs(prev => prev.length ? [] : [""]);
                setSearchQuery("");
        };

        const handleChange = (value, index) => {
                const updatedInputs = [...inputs];
                if (value && typeof value === 'object' && (value.value || value.name)) {
                        updatedInputs[index] = {
                                name: value.name || value.label || value.value,
                                icon: value.icon || value.slug || value.value,
                                url: value.url || `https://${(value.icon || value.slug || value.name || '').toLowerCase()}.com`
                        };
                } else {
                        updatedInputs[index] = value;
                }
                setInputs(updatedInputs);
        };

        const handleCancel = (index) => {
                const updatedInputs = [...inputs];
                updatedInputs.splice(index, 1);
                setInputs(updatedInputs);
        };

        const handleMore = () => {
                setInputs((prev) => [...prev, ""]);
        };

        const handleDone = () => {
                let newEntries = [];
                let newValuesSet = new Set(valuesSet);

                for (let input of inputs) {
                        if (!input) continue;

                        if (tag.icon) {
                                const valStr = typeof input === 'string' ? input.trim() : input.name;
                                if (valStr && !newValuesSet.has(valStr)) {
                                        newEntries.push(valStr);
                                        newValuesSet.add(valStr);
                                }
                        } else {
                                const itemObj = typeof input === 'object' 
                                        ? {
                                                _id: `soc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                                                name: input.name,
                                                icon: input.icon || input.name,
                                                url: input.url || `https://${input.name.toLowerCase()}.com`
                                          }
                                        : {
                                                _id: `soc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                                                name: input,
                                                icon: input,
                                                url: `https://${input.toLowerCase()}.com`
                                          };

                                if (itemObj.name && !newValuesSet.has(itemObj.name)) {
                                        newEntries.push(itemObj);
                                        newValuesSet.add(itemObj.name);
                                }
                        }
                }

                if (newEntries.length > 0) {
                        if (tag.name === "professions" || tag.icon) {
                                if (updateProfile) {
                                        updateProfile({ professions: [...(values || []), ...newEntries] });
                                }
                        } else {
                                if (addSocialLinks) {
                                        addSocialLinks(newEntries);
                                }
                        }
                }

                setValuesSet(new Set([...valuesSet, ...newValuesSet]));
                setInputs([]);
                setSearchQuery("");
        };

        const handleRemove = (index, value) => {
                const valName = tag.icon ? value : (typeof value === 'object' ? value.name : value);
                setValuesSet((prev) => {
                        const updatedSet = new Set(prev);
                        updatedSet.delete(valName);
                        return updatedSet;
                });

                if (tag.name === "professions" || tag.icon) {
                        if (updateProfile) {
                                const updatedProfessions = (values || []).filter((_, i) => i !== index);
                                updateProfile({ professions: updatedProfessions });
                        }
                } else {
                        if (deleteSocialLink) {
                                const idToDelete = typeof value === 'object' ? (value._id || value.name) : value;
                                deleteSocialLink(idToDelete);
                        }
                }
        };

        useEffect(() => {
                setValuesSet(new Set(tag.icon ? [...(values || [])] : (values || []).map(v => typeof v === 'object' ? v.name : v)));
        }, [values, tag.icon]);

        return (
                <div className="tag-input">
                        <p className="label">
                                {tag.label}
                        </p>

                        <div className="list">
                                {inputs.length ? (
                                        <NewTag
                                                inputs={inputs}
                                                tag={tag}
                                                selectOptions={selectOptions}
                                                handleCancel={handleCancel}
                                                handleChange={handleChange}
                                                handleDone={handleDone}
                                                handleMore={handleMore}
                                                setSearchQuery={setSearchQuery}
                                        />
                                ) : null}

                                {values && values.length ? (
                                        values.map((value, index) => {
                                                const isCustomTag = Boolean(tag.icon);
                                                const valName = isCustomTag ? value : (typeof value === 'object' ? value.name : value);
                                                const valIcon = isCustomTag ? tag.icon : (typeof value === 'object' ? (value.icon || value.name) : value);

                                                return (
                                                        <div key={index} className={`sub-label ${tag.subLabel}`}>
                                                                <p className="value">
                                                                        <span className="icon">
                                                                                {isCustomTag ? (
                                                                                        typeof tag.icon === 'function' || typeof tag.icon === 'object' ? (
                                                                                                <tag.icon sx={{ fontSize: '2.2vh', color: 'var(--admin-accent)' }} />
                                                                                        ) : typeof tag.icon === 'string' && (tag.icon.endsWith('.png') || tag.icon.startsWith('/') || tag.icon.startsWith('data:')) ? (
                                                                                                <img src={tag.icon} alt={tag.subLabel} />
                                                                                        ) : (
                                                                                                <SimpleIcon name={tag.icon} size="20px" color="var(--admin-accent)" />
                                                                                        )
                                                                                ) : (
                                                                                        <SimpleIcon name={valIcon} size="20px" color="var(--admin-accent)" />
                                                                                )}
                                                                        </span>

                                                                        <span className="name" style={{ color: "var(--admin-text-primary)" }}>
                                                                                {valName}
                                                                        </span>
                                                                </p>

                                                                <p className="delete" onClick={() => { handleRemove(index, value); }}>
                                                                        <DeleteOutlineRoundedIcon sx={{ fontSize: '2.2vh', color: 'var(--admin-text-muted)' }} />
                                                                </p>
                                                        </div>
                                                );
                                        })
                                ) : (
                                        <p className="no-values">{`No ${tag.subLabel} yet!`}</p>
                                )}
                        </div>

                        <p className="add" onClick={handleAdd}>
                                <span className="icon">
                                        <AddRoundedIcon sx={{ fontSize: '2vh', color: 'currentColor' }} />
                                </span>
                                add
                        </p>
                </div>
        );
}

export default TagInput;