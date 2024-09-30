import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Attribution from './Attributions';


describe("Attribution Component", () => {
    
    test("initial state", async () => {
        // Génération DOM virtuel et sélection des noeuds
        render(<Attribution licenses={['CC', 'SA']} data={[{url:"http://monurl.fr", name:"MyDataSourceName"}]} />);

        // Assertions
        expect(screen.getByText("MyDataSourceName")).toBeInTheDocument();
        expect(screen.getByText("Source des données:")).toBeInTheDocument();

        const linkElement = screen.getByText("MyDataSourceName");
        expect(linkElement).toHaveAttribute('href', "http://monurl.fr");

        expect(screen.queryByLabelText('CC')).toBeInTheDocument();
        expect(screen.queryByLabelText('SA')).toBeInTheDocument();
        expect(screen.queryByLabelText('NC')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('BY')).not.toBeInTheDocument();


    });
});