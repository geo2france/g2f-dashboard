import {render, screen} from '@testing-library/react'
import FlipCard from "./FlipCard";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'


const a_value = "Hello !"
const b_value = "Ceci est une description"

describe("FlipCard Component", () => {
    
    test("initial state", async () => {
        // Génération DOM virtuel et sélection des noeuds
        render(<FlipCard information={b_value}><span>{a_value}</span></FlipCard>);
        const cardA = screen.getByText(a_value).closest('.ant-card'); // Recto
        const cardB = screen.getByText(b_value).closest('.ant-card');  // Verso

        // Assertions
        expect(screen.queryByText(a_value)).toBeInTheDocument();
        expect(screen.queryByText(b_value)).toBeInTheDocument();

        expect(cardA).not.toHaveStyle('transform: rotateY(180deg)');
        expect(cardB).toHaveStyle('transform: rotateY(180deg)');

    });

    test("flip the card", async () =>{
        // initialisation user
        const user = userEvent.setup();

        // Génération DOM virtuel et sélection des noeuds
        render(<FlipCard information={b_value}><span>{a_value}</span></FlipCard>);

        const cardA = screen.getByText(a_value).closest('.ant-card'); // Recto
        const cardB = screen.getByText(b_value).closest('.ant-card');  // Verso
        const infoButton = screen.getAllByRole('button', {name:"info"}); // Bouton info (2 boutons identiques, un sur chaque face). A améliorer


        // Assertions
        await user.click(infoButton[0])

        expect(cardA).toHaveStyle('transform: rotateY(180deg)');
        expect(cardB).not.toHaveStyle('transform: rotateY(180deg)');

        await user.click(infoButton[1])

        expect(cardA).not.toHaveStyle('transform: rotateY(180deg)');
        expect(cardB).toHaveStyle('transform: rotateY(180deg)');

    })

})