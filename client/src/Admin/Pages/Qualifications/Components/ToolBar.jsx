import { useContext } from 'react';
import { LayoutContext } from '../Contexts/LayoutContext';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import '../Styles/ToolBar.css';

function ToolBar() {
	const { layout, setLayout } = useContext(LayoutContext);

	const handleLayout = () => {
		setLayout((prev) => !prev);
	};

	return (
		<div className="tool-bar">
			<div className="search-bar">
				<p className="search">
					<SearchRoundedIcon sx={{ fontSize: '2vh', color: 'var(--admin-text-muted)' }} />
					<input type="text" name="search" id="search" placeholder="Search your qualifications"/>
				</p>
			</div>

			<div className="action-bar">
				<p className="new-qualification">
					<span className="icon">
						<AddRoundedIcon sx={{ fontSize: '1.8vh' }} />
					</span>

					New qualification
				</p>

				<div className="layout">
					{ layout ?
						<p className="list-view" onClick={handleLayout}>
							List
							<span className="icon">
								<ViewListRoundedIcon sx={{ fontSize: '1.8vh' }} />
							</span>
						</p>
						:
						<p className="grid-view" onClick={handleLayout}>
							Grid
							<span className="icon" onClick={handleLayout}>
								<GridViewRoundedIcon sx={{ fontSize: '1.8vh' }} />
							</span>
						</p>
					}
				</div>
			</div>
		</div>
	);
}

export default ToolBar;