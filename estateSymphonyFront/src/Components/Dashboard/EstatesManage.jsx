import Row from "react-bootstrap/esm/Row";
import Col from 'react-bootstrap/esm/Col';
import { useContext } from 'react';
import PropertiesContext from '../../context/propertieContext';
import CustomCard from '../Card/CustomCard';
import AddIcon from '@mui/icons-material/Add';

const EstatesManager = () => {

    let { properties } = useContext(PropertiesContext);

    return (
        <Row className="DashboardEstatesList">
            <Col className="DashboardTitle mt-3">
                <span>Listes des propriétés</span>
                <AddIcon fontSize="large"></AddIcon>
            </Col>
            <Col className="Card">
                {properties.map((item, index) => {
                    return (
                        <CustomCard
                            {...item}
                            key={index}
                            item={item}
                            dashboard={true}
                        >
                        </CustomCard>
                    )
                })}
            </Col>
        </Row>
    )
}

export default EstatesManager