import { Button, Card, Typography } from "antd"
import { CSSProperties, ReactElement, useState } from "react"
import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs"

const { Text } = Typography;

export interface KeyFigureProps {
    name:string,
    description?:string,
    value:number|string,
    unit?:string,
    sub_value?:number|string,
    icon?:ReactElement,
    digits?:number
}

/**
 * Composant permettant d'afficher un chiffre clé.
 * Si une description est fournie, le composant "flip" pour montrer la description
 * L'utilisateur peut aussi fournir une valeur de référence, généralement la valeur régionale ou nationale
 */
export const KeyFigure: React.FC<KeyFigureProps> = ({ name, description, value, unit, sub_value, icon, digits }) => {
    const [flipped, setFlipped] = useState(false);
    const toggleFlipped = () => setFlipped(!flipped);

    const cardStyle: CSSProperties = {
      position: "absolute",
      transition: "transform 0.8s",
      backfaceVisibility: "hidden",
      width: "100%",
      height: "100%",
    };

    const title: ReactElement = (
      <span style={{ marginLeft: 5 }}>
        {name}{" "}
        {description && ( //Affichage du bouton "i" s'il y a une description
          <Button
            type="text"
            onClick={toggleFlipped}
            shape="circle"
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            {flipped ? <BsInfoCircleFill /> : <BsInfoCircle />}
          </Button>
        )}
      </span>
    );
    return (
      <div style={{ position: "relative", height: 120 }}>
        <Card
          title={title}
          style={{ transform: flipped ? "rotateY(180deg)" : "", ...cardStyle }}
        >
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <span style={{ fontSize: 24 }}>
              {icon} {value.toLocaleString(undefined,{maximumFractionDigits:digits})} {unit}
            </span>{" "}
            <span style={{ fontSize: 18 }}>
              <br />
              <Text type="secondary">{sub_value} </Text>
            </span>
          </div>
        </Card>
        <Card
          title={title}
          style={{ transform: !flipped ? "rotateY(180deg)" : "", ...cardStyle }}
        >
          <div style={{ margin: 10 }}>
            <Text italic type="secondary">
              {description}
            </Text>
          </div>
        </Card>
      </div>
    );
}