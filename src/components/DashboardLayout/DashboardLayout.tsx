import { Col, Flex, Radio, Row, RowProps } from "antd";
import DashboardElement, {IDashboardElementProps} from "../DashboardElement/DashboardElement";
import React from "react";
import { useSearchParamsState } from "../../utils/useSearchParamsState";
import Control from "../Control/Control";

interface IDashboardLayoutProps {
    control? : React.ReactElement
    children : React.ReactElement<typeof DashboardElement>[];
    row_gutter? : RowProps['gutter']
}


const getSection = (child: React.ReactElement): string | undefined => 
    React.isValidElement<IDashboardElementProps>(child) ? child.props.section : undefined ;
  

const DashboardLayout:React.FC<IDashboardLayoutProps> = ({children, control, row_gutter=[8,8]}) => {
    const sections = [...new Set( children.map((child) => getSection(child) ?? 'Autres') )];

    const [activeTab, setActiveTab] = useSearchParamsState('tab',sections[0])

    sections.sort((a,b) => {
        if (a === 'Autres' ) {return 1};
        if (b === 'Autres' ) {return 1};
        return a.localeCompare(b);
    })

    return(
        <>
            <Control>
                <Flex>
                    {control}
                    {sections.length > 1 &&
                        <Radio.Group defaultValue="a" onChange={(e) => setActiveTab(e.target.value)} value={activeTab}>
                            {sections.map((section, idx) => 
                                <Radio.Button key={idx} value={section}>{section}</Radio.Button>
                            )}
                        </Radio.Group>
                    }
                </Flex>
            </Control>
            <Row gutter={row_gutter} style={{ margin: 16 }}>
                {children.filter((child) => (getSection(child) ?? 'Autres' ) == activeTab).map((child,idx) => 
                    <Col xl={12} xs={24} key={idx} >
                        {child}
                    </Col>
                )}
            </Row>
        </>
    )
}

export default DashboardLayout;