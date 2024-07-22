import React, { useRef } from 'react'
import { Button, Card, Typography } from "antd"
import { CSSProperties, ReactElement, useState } from "react"
import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs"

const { Text } = Typography;


interface FlipCardProps {
    title?:string|ReactElement
    children:ReactElement
    information?:ReactElement|string
}


/**
 * Une card qui peux se retourner et afficher des informations a son verso
 */
const FlipCard: React.FC<FlipCardProps> = ({ title, information, children }) => {
    const [flipped, setFlipped] = useState(false);
    const toggleFlipped = () => setFlipped(!flipped);
    const cardARef = useRef<HTMLDivElement>(null);

    const height = cardARef.current ? cardARef.current.clientHeight : undefined; // Forcer la hauteur à celle de la card "Recto"

    const cardStyle: CSSProperties = {
        position: "absolute",
        transition: "transform 0.8s",
        backfaceVisibility: "hidden",
        width: "100%",
      };

      const titleElement: ReactElement = (
        <span style={{ marginLeft: 5 }}>
          {title}{" "}
          {information && ( //Affichage du bouton "i" s'il y a une description
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
      <div style={{ position: "relative", height: height }}> 
        <Card
          title={titleElement}
          style={{ transform: flipped ? "rotateY(180deg)" : "", ...cardStyle }}
          ref={cardARef}
        >
          {children}
        </Card>
        <Card
          title={titleElement}
          style={{ 
            transform: !flipped ? "rotateY(180deg)" : "", 
            height: height ,
            overflow:"auto",
            ...cardStyle}} 
        >
          {typeof information === "string" ? (
            <div style={{ margin: 10 }}>
              <Text italic type="secondary">
                {information}
              </Text>
            </div>
          ) : (
            <>{information}</>
          )}
        </Card>
      </div>
    );
};

export default FlipCard;