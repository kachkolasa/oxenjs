import { createRoot } from "react-dom/client";
import SectionPaddingY from "./SectionPaddingY";
import { PlusCircleFill } from "react-bootstrap-icons";
import { generateRandomId } from "@/utils/helpers";

const section_classes = 'ox-section ox-editable-section';

const NewSection = () => {
    return (
        <>
            <SectionPaddingY height={50} />
            <div className="container mx-auto">
                <div className="grid grid-cols-2 ox-section-row">
                    <div className="col-span-1">
                        <h1 className='text-3xl'>Hello world</h1>
                    </div>
                    <div className="col-span-1">
                        <p className='text-base'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, sint libero iure voluptates quas corporis qui impedit obcaecati numquam totam incidunt est quod, ipsa facere beatae quam similique! Libero, fuga?</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const addNewSectionHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const websiteContainer = document.getElementById('ox-website-container');
    if(!websiteContainer) return console.error('Website container not found');
    
    
    const section = document.createElement('section');
    section.className = section_classes;
    section.id = generateRandomId();


    websiteContainer.appendChild(section);
    createRoot(section).render(<NewSection />);
}

const AddNewSection = () => {
    return (
        <div className='w-full h-[400px] flex flex-wrap items-center justify-center bg-zinc-50'>
            <div className='bg-white w-[90%] md:w-[50%] p-5 border-dashed border-2 border-zinc-300 flex flex-wrap items-center justify-center gap-5'>
                <div className='border border-primary-500 flex items-center justify-center flex-col text-center p-5 text-primary-500 rounded cursor-pointer' onClick={addNewSectionHandler}>
                    <div>
                        <PlusCircleFill className='text-3xl' />
                    </div>
                    <div>
                        New section
                    </div>
                </div>
                <div className='border flex items-center justify-center flex-col text-center p-5 text-zinc-400 rounded cursor-pointer'>
                    <div>
                        <PlusCircleFill className='text-3xl' />
                    </div>
                    <div>
                        Select a template
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewSection;