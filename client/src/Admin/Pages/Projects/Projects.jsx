import useProjectsDisplayReducer from "./Hooks/useProjectsDisplayReducer";
import { ProjectsDisplayContextProvider } from "./Contexts/ProjectsDisplayContext";
import { NotifyContext, NotifyContextProvider } from "./Contexts/NotifyContext";
import { LayoutContext, LayoutContextProvider } from "./Contexts/LayoutContext";
import { ViewContextProvider } from "./Contexts/ViewContext";
import { NewContext } from "../../Components/New/Context/NewContext";
import useProjectsReducer from "../../../Hooks/useProjectsReducer";
import Notify from "../../Components/Notify/Notify";
import TopView from "../../Components/TopView/TopView";
import ToolBar from "../../Components/ToolBar/ToolBar";
import MainSection from "./Components/MainSection";
import View from "./Components/View";
import New from "../../Components/New/New";
import Edit from "../../Components/Edit/Edit";
import Form from "./Components/Form";
import './Projects.css';


function Projects() {
        const hook = useProjectsReducer();
        const createHook = hook.createProject;
        const updateHook = hook.updateProject;

        return (
                <div className="projects">
                        <ProjectsDisplayContextProvider>
                                <NotifyContextProvider>
                                        <LayoutContextProvider>
                                                <ViewContextProvider >
                                                        <Notify NotifyContext={NotifyContext} />

                                                        <TopView page={"Projects"} />

                                                        <ToolBar 
                                                                componentName={"projects"} 
                                                                singleComponentName={"project"}
                                                                LayoutContext={LayoutContext} 
                                                                reducer={useProjectsDisplayReducer}
                                                                NewContext={NewContext}
                                                                newForm={Form()}
                                                        />

                                                        <MainSection />

                                                        <View />

                                                        <New componentName={"project"} NotifyContext={NotifyContext} createHook={createHook} />

                                                        <Edit componentName={"project"} NotifyContext={NotifyContext} updateHook={updateHook} />
                                                </ViewContextProvider>
                                        </LayoutContextProvider>
                                </NotifyContextProvider>
                        </ProjectsDisplayContextProvider>
                </div>
        );
}

export default Projects;