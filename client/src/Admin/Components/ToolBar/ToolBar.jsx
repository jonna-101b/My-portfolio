import { useContext, useState } from 'react';
import SearchIcon from '../../../assets/Icons/Admin/Common/search.png';
import FilterIcon from '../../../assets/Icons/Admin/Common/filter.png';
import FilterActiveIcon from '../../../assets/Icons/Admin/Common/filter-active.png';
import AddIcon from '../../../assets/Icons/Admin/Common/plus.png';
import ListIcon from '../../../assets/Icons/Admin/Common/list.png';
import ListHoverIcon from '../../../assets/Icons/Admin/Common/list-hover.png';
import GridIcon from '../../../assets/Icons/Admin/Common/grid.png';
import GridHoverIcon from '../../../assets/Icons/Admin/Common/grid-hover.png';
import SortIcon from '../../../assets/Icons/Admin/Common/sort.png';
import SortHoverIcon from '../../../assets/Icons/Admin/Common/sort-hover.png';
import CancelBlackIcon from '../../../assets/Icons/Admin/Common/cancel-black.png';
// sort icons
import NewIcon from '../../../assets/Icons/Admin/Common/new.png';
import NewHoverIcon from '../../../assets/Icons/Admin/Common/new-hover.png';
import OldIcon from '../../../assets/Icons/Admin/Common/old.png';
import OldHoverIcon from '../../../assets/Icons/Admin/Common/old-hover.png';
import RecentIcon from '../../../assets/Icons/Admin/Common/recent.png';
import RecentHoverIcon from '../../../assets/Icons/Admin/Common/recent-hover.png';
import AZIcon from '../../../assets/Icons/Admin/Common/AZ.png';
import AZHoverIcon from '../../../assets/Icons/Admin/Common/AZ-hover.png';
import ZAIcon from '../../../assets/Icons/Admin/Common/ZA.png';
import ZAHoverIcon from '../../../assets/Icons/Admin/Common/ZA-hover.png';
import './ToolBar.css';

function ToolBar({ componentName, singleComponentName, LayoutContext, reducer, title="Title", NewContext, newForm }) {
        const { setNew } = useContext(NewContext);
        const { layout, setLayout } = useContext(LayoutContext);
        const [ displayFilter, setDisplayFilter ] = useState(false);
        const [ displaySort, setDisplaySort ] = useState(false);
        const { searchComponent, filters, filterTags, addFilter, cancelFilter, sortMethod, sortComponent } = reducer();

        const handleNew = () => {
                setNew(newForm);
        };

        const handleLayout = () => {
                setLayout((prev) => !prev);
        };

        const handleSearch = (event) => {
                searchComponent(event.target.value);
        };

        const handleFilterDisplay = () => {
                setDisplayFilter(prev => !prev);
        };

        const handleFilter = (filter) => {
                addFilter(filter);
        };

        const handleCancel = (filter) => {
                cancelFilter(filter);
        };

        const handleSortDisplay = () => {
                setDisplaySort(prev => !prev);
        };

        const handleSort = (event, sortBy, order) => {
                if (sortMethod.sortBy !== sortBy || sortMethod.order !== order) {
                        sortComponent(sortBy, order);
                }
                else {
                        event.stopPropagation();
                }
        };

        const checkSortMethod = (sortBy, order) => {
                return sortMethod.sortBy === sortBy && sortMethod.order === order;
        }

        return (
                <div className="tool-bar">
                        <div className="search-bar">
                                <p className="search">
                                        <img src={SearchIcon} alt="Search icon" />
                                        <input type="text" name="search" id="search" placeholder={`Search your ${componentName}`} onChange={handleSearch} />
                                </p>

                                { filters ?
                                        <div className={`filter ${displayFilter ? "active" : ""}`} onClick={handleFilterDisplay}>
                                                <span className="icon">
                                                        <img src={FilterIcon} alt="Filter icon" />
                                                        <img src={FilterActiveIcon} alt="Filter icon" className="active" />
                                                </span>
                                                filter

                                                <div className="filters">
                                                        <div className="wrapper">
                                                        { filters.map((filter, index) => (
                                                                <p key={index} onClick={() => {handleFilter(filter)}}>{filter}</p>
                                                        )) }
                                                        </div>
                                                </div>
                                        </div>
                                        : null
                                }
                        </div>
                        
                        
                        { filters && filterTags.size ?
                                <div className="filtered-items">
                                        {[...filterTags].map((filter, index) => (
                                                <p key={index} >
                                                        { filter }
                                                        <span className="icon" onClick={() => {handleCancel(filter)}}>
                                                                <img src={CancelBlackIcon} alt="Cancel icon" />
                                                        </span>
                                                </p>
                                        )) }
                                </div>
                                : null
                        }

                        <div className="action-bar">
                                <div className="new-button" onClick={handleNew}>
                                        <p>
                                                <span className="icon">
                                                        <img src={AddIcon} alt="Add icon" />
                                                </span>
                                                {`New ${singleComponentName}`}
                                        </p>
                                </div>

                                <div className="other-actions">
                                        { layout ?
                                                <p className="list-view layout" onClick={handleLayout}>
                                                        List
                                                        <span className="icon">
                                                                <img src={ListIcon} alt="List icon" />
                                                                <img src={ListHoverIcon} alt="List icon" className="hover" />
                                                        </span>
                                                </p>
                                                :
                                                <p className="grid-view layout" onClick={handleLayout}>
                                                        grid
                                                        <span className="icon" onClick={handleLayout}>
                                                                <img src={GridIcon} alt="Grid icon" />
                                                                <img src={GridHoverIcon} alt="Grid icon" className="hover" />
                                                        </span>
                                                </p>
                                        }
                                        
                                        <div className={`sort ${displaySort ? "active" : ""}`} onClick={handleSortDisplay} >
                                                Sort
                                                <span className="icon">
                                                        <img src={SortIcon} alt="Sort icon" />
                                                        <img src={SortHoverIcon} alt="Sort icon" className="hover sort-icon" />
                                                </span>

                                                <div className="method">
                                                        <p 
                                                                className={`newest ${checkSortMethod("createdAt", "desc") ? "active" : ""}`} 
                                                                onClick={(event) => {handleSort(event, "createdAt", "desc")}} 
                                                                >
                                                                Newest
                                                                <span className="icon">
                                                                        <img src={NewIcon} alt="" />
                                                                        <img src={NewHoverIcon} alt=""  className="hover" />
                                                                </span>
                                                        </p>

                                                        <p
                                                                className={`oldest ${checkSortMethod("createdAt", "asc") ? "active" : ""}`} 
                                                                onClick={(event) => {handleSort(event, "createdAt", "asc")}} 
                                                                >
                                                                Oldest
                                                                <span className="icon">
                                                                        <img src={OldIcon} alt="" />
                                                                        <img src={OldHoverIcon} alt=""  className="hover" />
                                                                </span>
                                                        </p>

                                                        <p 
                                                                className={`oldest ${checkSortMethod("updatedAt", "desc") ? "active" : ""}`} 
                                                                onClick={(event) => {handleSort(event, "updatedAt", "desc")}} 
                                                                >
                                                                Recently updated
                                                                <span className="icon">
                                                                        <img src={RecentIcon} alt="" />
                                                                        <img src={RecentHoverIcon} alt=""  className="hover" />
                                                                </span>
                                                        </p>

                                                        <p 
                                                                className={`${title}-ascending ${checkSortMethod(title.toLowerCase(), "asc") ? "active" : ""}`} 
                                                                onClick={(event) => {handleSort(event, title.toLowerCase(), "asc")}} 
                                                        >
                                                                {`${title}-ascending`}
                                                                <span className="icon">
                                                                        <img src={AZIcon} alt="" />
                                                                        <img src={AZHoverIcon} alt=""  className="hover" />
                                                                </span>
                                                        </p>

                                                        <p 
                                                                className={`${title}-descending ${checkSortMethod(title.toLowerCase(), "desc") ? "active" : ""}`} 
                                                                onClick={(event) => {handleSort(event, title.toLowerCase(), "desc")}} 
                                                        >
                                                                {`${title}-descending`}
                                                                <span className="icon">
                                                                        <img src={ZAIcon} alt="" />
                                                                        <img src={ZAHoverIcon} alt=""  className="hover" />
                                                                </span>
                                                        </p>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default ToolBar;