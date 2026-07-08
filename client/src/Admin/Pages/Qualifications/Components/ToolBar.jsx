import { useContext } from 'react';
import { LayoutContext } from '../Contexts/LayoutContext';
import SearchIcon from '../../../../assets/Icons/Admin/Common/search.png';
import AddIcon from '../../../../assets/Icons/Admin/Common/plus.png';
import ListIcon from '../../../../assets/Icons/Admin/Common/list.png';
import ListHoverIcon from '../../../../assets/Icons/Admin/Common/list-hover.png';
import GridIcon from '../../../../assets/Icons/Admin/Common/grid.png';
import GridHoverIcon from '../../../../assets/Icons/Admin/Common/grid-hover.png';
import '../Styles/ToolBar.css';

function ToolBar() {
        const { layout, setLayout } = useContext(LayoutContext);

        const handleLayout = () => {
                setLayout((prev) => !prev);
        }

        return (
                <div className="tool-bar">
                        <div className="search-bar">
                                <p className="search">
                                        <img src={SearchIcon} alt="Search icon" />
                                        <input type="text" name="search" id="search" placeholder="Search your qualifications"/>
                                </p>
                        </div>

                        <div className="action-bar">
                                <p className="new-qualification">
                                        <span className="icon">
                                                <img src={AddIcon} alt="Add icon" />
                                        </span>

                                        New qualification
                                </p>

                                <div className="layout">
                                       { layout ?
                                                <p className="list-view" onClick={handleLayout}>
                                                        List
                                                        <span className="icon">
                                                                <img src={ListIcon} alt="List icon" />
                                                                <img src={ListHoverIcon} alt="List icon" className="hover" />
                                                        </span>
                                                </p>
                                                :
                                                <p className="grid-view" onClick={handleLayout}>
                                                        grid
                                                        <span className="icon" onClick={handleLayout}>
                                                                <img src={GridIcon} alt="Grid icon" />
                                                                <img src={GridHoverIcon} alt="Grid icon" className="hover" />
                                                        </span>
                                                </p>
                                        }
                                </div>
                        </div>
                </div>
        );
}

export default ToolBar;