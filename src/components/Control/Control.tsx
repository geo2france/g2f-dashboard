import { Layout } from "antd"
import { CSSProperties, ReactNode } from "react"

const {Header} = Layout

interface IControlProps {
    children: ReactNode;
    style?:CSSProperties
}

/*
* Composant destiné à recevoir un Form avec les contrôles de la page
*/
const Control: React.FC<IControlProps> = ({ children, style = {} }) => {
  return (
    <Header
      style={{padding: 12, position: "sticky", top: 0, zIndex: 1, backgroundColor: "#fff", ...style}} 
    >
        {children}
    </Header>
  );
};

export default Control;