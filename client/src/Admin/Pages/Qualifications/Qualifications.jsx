import useQualificationsDisplayReducer from "./Hooks/useQualificationsDisplayReducer";
import { QualificationsDisplayContextProvider } from "./Contexts/QualificationsDisplayContext";
import { NotifyContext, NotifyContextProvider } from "./Contexts/NotifyContext";
import { LayoutContext, LayoutContextProvider } from "./Contexts/LayoutContext";
import { ViewContextProvider } from "./Contexts/ViewContext";
import { NewContext } from "../../Components/New/Context/NewContext";
import useQualificationsReducer from "../../../Hooks/useQualificationsReducer";
import Notify from "../../Components/Notify/Notify";
import TopView from "../../Components/TopView/TopView";
import ToolBar from "../../Components/ToolBar/ToolBar";
import MainSection from "./Components/MainSection";
import View from "./Components/View";
import New from "../../Components/New/New";
import Edit from "../../Components/Edit/Edit";
import Form from "./Components/Form";
import './Qualifications.css';

function Qualifications() {
        const hook = useQualificationsReducer();
        const createHook = hook.createQualification;
        const updateHook = hook.updateQualification;

        return (
                <div className="qualifications">
                        <QualificationsDisplayContextProvider>
                                <NotifyContextProvider>
                                        <LayoutContextProvider>
                                                <ViewContextProvider >
                                                        <Notify NotifyContext={NotifyContext} />
                                                        
                                                        <TopView page={"Qualifications"} />

                                                        <ToolBar 
                                                                componentName={"qualifications"} 
                                                                singleComponentName={"qualification"}
                                                                LayoutContext={LayoutContext} 
                                                                reducer={useQualificationsDisplayReducer}
                                                                title="Discipline"
                                                                NewContext={NewContext}
                                                                newForm={Form()}
                                                        />

                                                        <MainSection />

                                                        <View />

                                                        <New  componentName={"qualification"} NotifyContext={NotifyContext} createHook={createHook} />

                                                        <Edit componentName={"qualification"} NotifyContext={NotifyContext} updateHook={updateHook} />
                                                </ViewContextProvider>
                                        </LayoutContextProvider>
                                </NotifyContextProvider>
                        </QualificationsDisplayContextProvider>
                </div>
        );
}

export default Qualifications;