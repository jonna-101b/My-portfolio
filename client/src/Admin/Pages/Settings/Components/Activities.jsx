import useActivitiesReducer from "../../../../Hooks/useActivitiesReducer";
import { formatDistanceToNow } from "date-fns";
import PlusIcon from '../../../../assets/Icons/Admin/Activities/add.png';
import UserIcon from '../../../../assets/Icons/Admin/Activities/user.png';
import LockIcon from '../../../../assets/Icons/Admin/Activities/lock.png';
import PencilIcon from '../../../../assets/Icons/Admin/Activities/pencil.png';
import DeleteIcon from '../../../../assets/Icons/Admin/Common/delete.png';
import DeleteHoverIcon from '../../../../assets/Icons/Admin/Common/delete-hover.png';
import '../Styles/Activities.css';


function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
}

function Activity({ activity }) {
        const actionIcons = {
                "edit": PencilIcon,
                "add": PlusIcon,
                "delete": DeleteIcon,
                "login": UserIcon,
                "logout": UserIcon,
                "change password": LockIcon
        };


        return (
                <div className="activity">
                        <div className="icon">
                                <img src={ actionIcons[activity.action] } alt="Icon" />
                        </div>

                        <div className="content">
                                <p className="action-type">
                                        { `${capitalizeFirstLetter(activity.action)}${activity.destination ? ` ${activity.destination}` : ""}`}
                                </p>

                                <p className="description">
                                        I don't know
                                </p>
                        </div>

                        <div className="other">
                                <div className="actions">
                                        <p className="delete">
                                                <img src={DeleteIcon} alt="Delete icon" className="main" />
                                                <img src={DeleteHoverIcon} alt="Delete icon" className="hover" />
                                        </p>
                                </div>

                                <p className="date">{ formatDistanceToNow(activity.date, {addSuffix: true}) }</p>
                        </div>
                </div>
        );
}

function Activities() {
        const { state } = useActivitiesReducer();
        const { activities } = state;

        return (
                <div className="activities">
                        <div className="category">
                                <p className="title">Recent Actions</p>

                                <div className="list">
                                        { activities.map((activity, index) => (
                                                <Activity key={index} activity={activity} />
                                        )) }
                                </div>
                        </div>
                </div>
        );
}

export default Activities;