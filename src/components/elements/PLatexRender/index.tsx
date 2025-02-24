import 'katex/dist/katex.min.css';
import { FC } from 'react';
import Latex from 'react-latex-next';

interface PLatexRenderProps {
    content: string;
}

const PLatexRender: FC<PLatexRenderProps> = ({ content }) => {


    return (
        <div className="p-latex-container">
            <Latex
            >
                {content}
            </Latex>
        </div>
    );
};

export default PLatexRender;
