import { useContext, useState, useRef, useEffect } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import './ToolBar.css';

function ToolBar({ componentName, singleComponentName, LayoutContext, reducer, title="Title", NewContext, newForm }) {
        const { setNew } = useContext(NewContext);
        const { layout, setLayout } = useContext(LayoutContext);
        const [ displayFilter, setDisplayFilter ] = useState(false);
        const [ displaySort, setDisplaySort ] = useState(false);
        const [ searchValue, setSearchValue ] = useState("");
        const { searchComponent, filters, filterTags, addFilter, cancelFilter, sortMethod, sortComponent } = reducer();

        const filterRef = useRef(null);
        const sortRef = useRef(null);

        useEffect(() => {
                const handleClickOutside = (event) => {
                        if (filterRef.current && !filterRef.current.contains(event.target)) {
                                setDisplayFilter(false);
                        }
                        if (sortRef.current && !sortRef.current.contains(event.target)) {
                                setDisplaySort(false);
                        }
                };

                document.addEventListener('mousedown', handleClickOutside);
                return () => {
                        document.removeEventListener('mousedown', handleClickOutside);
                };
        }, []);

        const handleNew = () => {
                setNew(newForm);
        };

        const handleLayout = () => {
                setLayout((prev) => !prev);
        };

        const handleSearch = (event) => {
                setSearchValue(event.target.value);
                searchComponent(event.target.value);
        };

        const handleClearSearch = () => {
                setSearchValue("");
                searchComponent("");
        };

        const handleFilterDisplay = (e) => {
                e.stopPropagation();
                setDisplayFilter(prev => !prev);
                setDisplaySort(false);
        };

        const handleFilter = (filter) => {
                if (addFilter) addFilter(filter);
                setDisplayFilter(false);
        };

        const handleCancel = (filter) => {
                if (cancelFilter) cancelFilter(filter);
        };

        const handleSortDisplay = (e) => {
                e.stopPropagation();
                setDisplaySort(prev => !prev);
                setDisplayFilter(false);
        };

        const handleSort = (event, sortBy, order) => {
                event.stopPropagation();
                if (sortMethod.sortBy !== sortBy || sortMethod.order !== order) {
                        sortComponent(sortBy, order);
                }
                setDisplaySort(false);
        };

        const checkSortMethod = (sortBy, order) => {
                return sortMethod.sortBy === sortBy && sortMethod.order === order;
        };

        return (
                <div className="tool-bar">
                        <div className="search-bar-row">
                                <div className="search-input-box">
                                        <SearchRoundedIcon className="search-icon" />
                                        <input
                                                type="text"
                                                name="search"
                                                id="search"
                                                value={searchValue}
                                                placeholder={`Search your ${componentName}...`}
                                                onChange={handleSearch}
                                        />
                                        {searchValue && (
                                                <button
                                                        type="button"
                                                        className="search-clear-btn"
                                                        onClick={handleClearSearch}
                                                        title="Clear search"
                                                        aria-label="Clear search"
                                                >
                                                        <CloseRoundedIcon />
                                                </button>
                                        )}
                                </div>

                                {filters && (
                                        <div
                                                ref={filterRef}
                                                className={`filter-dropdown-container ${displayFilter ? "active" : ""}`}
                                        >
                                                <button
                                                        type="button"
                                                        className="filter-trigger-btn"
                                                        onClick={handleFilterDisplay}
                                                        aria-expanded={displayFilter}
                                                >
                                                        <TuneRoundedIcon className="filter-icon" />
                                                        <span>Filter</span>
                                                        <KeyboardArrowDownRoundedIcon className={`arrow-icon ${displayFilter ? "rotate" : ""}`} />
                                                </button>

                                                {displayFilter && (
                                                        <div className="filter-menu-popup" onClick={(e) => e.stopPropagation()}>
                                                                <div className="filter-menu-header">Filter by Domain</div>
                                                                <div className="filter-options-list">
                                                                        {filters.map((filter, index) => {
                                                                                const isSelected = filterTags && filterTags.has && filterTags.has(filter);
                                                                                return (
                                                                                        <button
                                                                                                key={index}
                                                                                                type="button"
                                                                                                className={`filter-option-item ${isSelected ? "selected" : ""}`}
                                                                                                onClick={() => handleFilter(filter)}
                                                                                        >
                                                                                                <span>{filter}</span>
                                                                                                {isSelected && <CheckRoundedIcon className="check-icon" />}
                                                                                        </button>
                                                                                );
                                                                        })}
                                                                </div>
                                                        </div>
                                                )}
                                        </div>
                                )}
                        </div>

                        {filters && filterTags && filterTags.size > 0 && (
                                <div className="active-filters-row">
                                        <span className="active-label">Active filters:</span>
                                        {[...filterTags].map((filter, index) => (
                                                <div key={index} className="filter-tag-chip">
                                                        <span>{filter}</span>
                                                        <button
                                                                type="button"
                                                                className="tag-remove-btn"
                                                                onClick={() => handleCancel(filter)}
                                                                title={`Remove ${filter}`}
                                                                aria-label={`Remove ${filter}`}
                                                        >
                                                                <CloseRoundedIcon />
                                                        </button>
                                                </div>
                                        ))}
                                </div>
                        )}

                        <div className="action-bar-row">
                                <div className="new-button" onClick={handleNew}>
                                        <button type="button" className="new-btn-inner">
                                                <AddRoundedIcon className="btn-add-icon" />
                                                <span>{`New ${singleComponentName}`}</span>
                                        </button>
                                </div>

                                <div className="other-actions-group">
                                        <button
                                                type="button"
                                                className="layout-toggle-btn"
                                                onClick={handleLayout}
                                                title={layout ? "Switch to Grid View" : "Switch to List View"}
                                                aria-label={layout ? "Switch to Grid View" : "Switch to List View"}
                                        >
                                                {layout ? (
                                                        <>
                                                                <ViewListRoundedIcon className="layout-icon active-icon" />
                                                                <span>List</span>
                                                        </>
                                                ) : (
                                                        <>
                                                                <GridViewRoundedIcon className="layout-icon active-icon" />
                                                                <span>Grid</span>
                                                        </>
                                                )}
                                        </button>

                                        <div
                                                ref={sortRef}
                                                className={`sort-dropdown-container ${displaySort ? "active" : ""}`}
                                        >
                                                <button
                                                        type="button"
                                                        className="sort-trigger-btn"
                                                        onClick={handleSortDisplay}
                                                        aria-expanded={displaySort}
                                                >
                                                        <SwapVertRoundedIcon className="sort-icon" />
                                                        <span>Sort</span>
                                                        <KeyboardArrowDownRoundedIcon className={`arrow-icon ${displaySort ? "rotate" : ""}`} />
                                                </button>

                                                {displaySort && (
                                                        <div className="sort-menu-popup" onClick={(e) => e.stopPropagation()}>
                                                                <div className="sort-menu-header">Sort Order</div>

                                                                <button
                                                                        type="button"
                                                                        className={`sort-option-item ${checkSortMethod("createdAt", "desc") ? "selected" : ""}`}
                                                                        onClick={(e) => handleSort(e, "createdAt", "desc")}
                                                                >
                                                                        <div className="item-label-group">
                                                                                <ScheduleRoundedIcon className="item-icon" />
                                                                                <span>Newest first</span>
                                                                        </div>
                                                                        {checkSortMethod("createdAt", "desc") && <CheckRoundedIcon className="check-icon" />}
                                                                </button>

                                                                <button
                                                                        type="button"
                                                                        className={`sort-option-item ${checkSortMethod("createdAt", "asc") ? "selected" : ""}`}
                                                                        onClick={(e) => handleSort(e, "createdAt", "asc")}
                                                                >
                                                                        <div className="item-label-group">
                                                                                <HistoryRoundedIcon className="item-icon" />
                                                                                <span>Oldest first</span>
                                                                        </div>
                                                                        {checkSortMethod("createdAt", "asc") && <CheckRoundedIcon className="check-icon" />}
                                                                </button>

                                                                <button
                                                                        type="button"
                                                                        className={`sort-option-item ${checkSortMethod("updatedAt", "desc") ? "selected" : ""}`}
                                                                        onClick={(e) => handleSort(e, "updatedAt", "desc")}
                                                                >
                                                                        <div className="item-label-group">
                                                                                <UpdateRoundedIcon className="item-icon" />
                                                                                <span>Recently updated</span>
                                                                        </div>
                                                                        {checkSortMethod("updatedAt", "desc") && <CheckRoundedIcon className="check-icon" />}
                                                                </button>

                                                                <button
                                                                        type="button"
                                                                        className={`sort-option-item ${checkSortMethod(title.toLowerCase(), "asc") ? "selected" : ""}`}
                                                                        onClick={(e) => handleSort(e, title.toLowerCase(), "asc")}
                                                                >
                                                                        <div className="item-label-group">
                                                                                <SortByAlphaRoundedIcon className="item-icon" />
                                                                                <span>{`${title} (A → Z)`}</span>
                                                                        </div>
                                                                        {checkSortMethod(title.toLowerCase(), "asc") && <CheckRoundedIcon className="check-icon" />}
                                                                </button>

                                                                <button
                                                                        type="button"
                                                                        className={`sort-option-item ${checkSortMethod(title.toLowerCase(), "desc") ? "selected" : ""}`}
                                                                        onClick={(e) => handleSort(e, title.toLowerCase(), "desc")}
                                                                >
                                                                        <div className="item-label-group">
                                                                                <SortByAlphaRoundedIcon className="item-icon" />
                                                                                <span>{`${title} (Z → A)`}</span>
                                                                        </div>
                                                                        {checkSortMethod(title.toLowerCase(), "desc") && <CheckRoundedIcon className="check-icon" />}
                                                                </button>
                                                        </div>
                                                )}
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default ToolBar;