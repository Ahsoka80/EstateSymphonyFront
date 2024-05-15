import './Dashboard.css'
import Row from "react-bootstrap/esm/Row";
import Col from 'react-bootstrap/esm/Col';
import { useContext, useEffect } from 'react';
import PropertiesContext from '../../context/propertieContext';
import CustomCard from '../Card/CustomCard';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EstatesManager = () => {
    const { fetchAllProperties } = useContext(PropertiesContext)
    useEffect(() => {
        fetchAllProperties();
    }, [])
    const navigate = useNavigate();
    const handleToAdd = () => {
        navigate('/dashboard/estate/create');
    }
    let { properties } = useContext(PropertiesContext);

    return (
        <Row className="DashboardEstatesList">
            <Col className="DashboardTitle mt-3">
                <span>Listes des propriétés</span>
            </Col>
            <Button onClick={handleToAdd}>
                <AddIcon fontSize="large" style={{ color: "Blue" }}></AddIcon>
            </Button>
            <Col className="card">
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