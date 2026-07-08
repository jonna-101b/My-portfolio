import useTestimonialsDisplayReducer from "./Hooks/useTestimonialsDisplayReducer";
import { TestimonialsDisplayContextProvider } from "./Contexts/TestimonialsDisplayContext";
import { NotifyContext, NotifyContextProvider } from "./Contexts/NotifyContext";
import { LayoutContext, LayoutContextProvider } from "./Contexts/LayoutContext";
import { ViewContextProvider } from "./Contexts/ViewContext";
import { NewContext } from "../../Components/New/Context/NewContext";
import { EditContext, EditContextProvider } from "./Contexts/EditContext";
import useTestimonialsReducer from "../../../Hooks/useTestimonialsReducer";
import Notify from "../../Components/Notify/Notify";
import TopView from "../../Components/TopView/TopView";
import ToolBar from "../../Components/ToolBar/ToolBar";
import MainSection from "./Components/MainSection";
import View from "./Components/View";
import New from "../../Components/New/New";
import Edit from "../../Components/Edit/Edit";
import Form from "./Components/Form";
import './Testimonials.css';

function Testimonials() {
        const hook = useTestimonialsReducer();
        const updateHook = hook.updateTestimonial;
        const createHook = hook.createTestimonial;

        return (
                <div className="testimonials">
                        <TestimonialsDisplayContextProvider>
                                <NotifyContextProvider>
                                        <LayoutContextProvider>
                                                <ViewContextProvider >
                                                        <Notify NotifyContext={NotifyContext} />

                                                        <TopView page={"Testimonials"} />

                                                        <ToolBar 
                                                                componentName={"testimonials"} 
                                                                singleComponentName={"testimonial"}
                                                                LayoutContext={LayoutContext} 
                                                                reducer={useTestimonialsDisplayReducer}
                                                                title="Name"
                                                                NewContext={NewContext}
                                                                newForm={Form()}
                                                        />

                                                        <MainSection />

                                                        <View />

                                                        <New componentName={"testimonial"} NotifyContext={NotifyContext} createHook={createHook} />

                                                        <Edit componentName={"testimonial"} NotifyContext={NotifyContext} updateHook={updateHook} />
                                                </ViewContextProvider>
                                        </LayoutContextProvider>
                                </NotifyContextProvider>
                        </TestimonialsDisplayContextProvider>
                </div>
        );
}

export default Testimonials;