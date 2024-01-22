import {Tooltip as Tooltip2} from "@nextui-org/react";

interface Props {
    text: string;
    children: React.ReactNode;
    placement?: 'top' | 'right' | 'bottom' | 'left';
};

const Tooltip = (props: Props) => {
    return (
        <Tooltip2 content={props.text} placement={props.placement || "top"} className='tooltip'>
            {props.children}
        </Tooltip2>
    )
}

export default Tooltip;