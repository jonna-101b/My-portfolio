import useArticlesDisplayReducer from "./Hooks/useArticlesDisplayReducer";
import { ArticlesDisplayContextProvider } from "./Contexts/ArticlesDisplayContext";
import { NotifyContext, NotifyContextProvider } from ".//Contexts/NotifyContext";
import { LayoutContext, LayoutContextProvider } from "./Contexts/LayoutContext";
import { ViewContextProvider } from "./Contexts/ViewContext";
import { NewContext } from "../../Components/New/Context/NewContext";
import useArticlesReducer from "../../../Hooks/useArticlesReducer";
import Notify from "../../Components/Notify/Notify";
import TopView from "../../Components/TopView/TopView";
import ToolBar from "../../Components/ToolBar/ToolBar";
import MainSection from "./Components/MainSection";
import View from "./Components/View";
import New from "../../Components/New/New";
import Edit from "../../Components/Edit/Edit";
import Form from "./Components/Form";
import './Articles.css';

function Articles() {
        const hook = useArticlesReducer();
        const createHook = hook.createArticle;
        const updateHook = hook.updateArticle;

        return (
                <div className="articles">
                        <ArticlesDisplayContextProvider>
                                <NotifyContextProvider>
                                        <LayoutContextProvider>
                                                <ViewContextProvider >
                                                        <Notify NotifyContext={NotifyContext} />

                                                        <TopView page={"Articles"} />

                                                        <ToolBar 
                                                                componentName={"articles"} 
                                                                singleComponentName={"article"}
                                                                LayoutContext={LayoutContext} 
                                                                reducer={useArticlesDisplayReducer}
                                                                title="Title"
                                                                NewContext={NewContext}
                                                                newForm={Form()}
                                                        />

                                                        <MainSection />

                                                        <View />

                                                        <New  componentName={"article"} NotifyContext={NotifyContext} createHook={createHook} />

                                                        <Edit componentName={"article"} NotifyContext={NotifyContext} updateHook={updateHook} />
                                                </ViewContextProvider>
                                        </LayoutContextProvider>
                                </NotifyContextProvider>
                        </ArticlesDisplayContextProvider>
                </div>
        );
}

export default Articles;