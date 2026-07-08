import { NotifyContext, NotifyContextProvider } from "./Contexts/NotifyContext";
import Notify from "../../Components/Notify/Notify";
import TopView from "../../Components/TopView/TopView";
import TechnicalSkills from "./Components/TechnicalSkills";
import ConceptualSkills from "./Components/ConceptualSkills";
import New from "../../Components/New/New";
import Edit from "../../Components/Edit/Edit";
import './Skills.css';
import useTechnicalSkillsReducer from "../../../Hooks/useTechnicalSkillsReducer";
import useConceptualSkillsReducer from "../../../Hooks/useConceptualSkillsReducer";

function Skills() {
    const technicalHook = useTechnicalSkillsReducer();
    const conceptualHook = useConceptualSkillsReducer();
    const createTechnical = technicalHook.createSkill;
    const createConceptual = conceptualHook.createSkill;
    const updateTechnical = technicalHook.updateSkill;
    const updateConceptual = conceptualHook.updateSkill;

    return (
        <div className="skills">
            <NotifyContextProvider>
                    <Notify NotifyContext={NotifyContext} />

                        <TopView page={"Skills"} />

                        <TechnicalSkills />

                        <ConceptualSkills />

                        <New componentName={"skill"} createHook={{ technicalSkills: createTechnical, conceptualSkills: createConceptual }} NotifyContext={NotifyContext} />

                        <Edit componentName={"skill"} NotifyContext={NotifyContext} updateHook={{ technicalSkills: updateTechnical, conceptualSkills: updateConceptual }} />
            </NotifyContextProvider>
        </div>
    );
}

export default Skills;