import useBlogDisplayReducer from "./Hooks/useBlogDisplayReducer";
import { BlogDisplayContextProvider } from "./Contexts/BlogDisplayContext";
import { NotifyContext, NotifyContextProvider } from "./Contexts/NotifyContext";
import { LayoutContext, LayoutContextProvider } from "./Contexts/LayoutContext";
import { ViewContextProvider } from "./Contexts/ViewContext";
import { NewContext } from "../../Components/New/Context/NewContext";
import useBlogReducer from "../../../Hooks/useBlogReducer";
import Notify from "../../Components/Notify/Notify";
import TopView from "../../Components/TopView/TopView";
import ToolBar from "../../Components/ToolBar/ToolBar";
import MainSection from "./Components/MainSection";
import View from "./Components/View";
import New from "../../Components/New/New";
import Edit from "../../Components/Edit/Edit";
import Form from "./Components/Form";
import './Blog.css';

function Blog() {
        const hook = useBlogReducer();
        const createHook = hook.createBlog;
        const updateHook = hook.updateBlog;

        return (
                <div className="blogs">
                        <BlogDisplayContextProvider>
                                <NotifyContextProvider>
                                        <LayoutContextProvider>
                                                <ViewContextProvider >
                                                        <Notify NotifyContext={NotifyContext} />

                                                        <TopView page={"Blog"} />

                                                        <ToolBar 
                                                                componentName={"blogs"} 
                                                                singleComponentName={"blog"}
                                                                LayoutContext={LayoutContext} 
                                                                reducer={useBlogDisplayReducer}
                                                                title="Title"
                                                                NewContext={NewContext}
                                                                newForm={Form()}
                                                        />

                                                        <MainSection />

                                                        <View />

                                                        <New  componentName={"blog"} NotifyContext={NotifyContext} createHook={createHook} />

                                                        <Edit componentName={"blog"} NotifyContext={NotifyContext} updateHook={updateHook} />
                                                </ViewContextProvider>
                                        </LayoutContextProvider>
                                </NotifyContextProvider>
                        </BlogDisplayContextProvider>
                </div>
        );
}

export default Blog;