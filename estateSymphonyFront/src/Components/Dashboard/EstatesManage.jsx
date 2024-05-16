import './Dashboard.css'
import Row from "react-bootstrap/esm/Row";
import Col from 'react-bootstrap/esm/Col';
import { useEffect, useState } from 'react';
import CustomCard from '../Card/CustomCard';
import AddIcon from '@mui/icons-material/Add';
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getPropertiesArchived, getPropertiesByStatus } from '../../utils/api/properties';
import { getAllStatuses } from '../../utils/api/statuses';
import CustomButton from '../Buttons/CustomButton';

const EstatesManager = () => {
    const [statuses, setStatuses] = useState([]);
    const [propertiesByStatus, setPropertiesByStatus] = useState([]);
    useEffect(() => {
        getAllStatuses().then(data => { setStatuses(data) })
    }, [])
    statuses.forEach(status => {
        if (status.hidden) {
            status.name = status.sold ? 'Vendu' : 'Loué';
        }
        if (!status.hidden) {
            status.name = status.sold ? 'En vente' : 'A louer';
        }
    });

    //NAVIGATION
    const navigate = useNavigate();
    const handleToAdd = () => {
        navigate('/dashboard/estate/create');
    }

    const handlePropertiesStatus = async (idStatuses) => {
        const response = await getPropertiesByStatus(idStatuses);
        console.log(response);
        setPropertiesByStatus(response);
    }
    const handlePropertiesArchived = async () => {
        const response = await getPropertiesArchived();
        console.log(response);
        setPropertiesByStatus(response);
    }
    return (
        <Row className="DashboardEstatesList">
            <Col className="DashboardTitle mt-3">
                <Typography color={'darkblue'} sx={{ margin: 3, fontSize: 25 }}>Listes des propriétés</Typography>
            </Col>
            <Button onClick={handleToAdd}>
                <AddIcon fontSize="large" style={{ color: "Blue" }}></AddIcon>
            </Button>
            {statuses.map((status, index) => (
                <CustomButton
                    key={index}
                    onClick={() => handlePropertiesStatus(status.id)}
                    color="warning"
                    text={status.name}
                />
            ))}
            <CustomButton
                onClick={() => handlePropertiesArchived()}
                color={"error"}
                text={"Archives"}
            />
            <Col className="card">
                {propertiesByStatus.map((item, index) => {
                    return (
                        <CustomCard
                            {...item}
                            key={index}
                            item={item}
                            dashboard={true}
                            handle={item.archived ? handlePropertiesArchived : handlePropertiesStatus}
                        >
                        </CustomCard>
                    )
                })}
            </Col>
        </Row>
    )
}

export default EstatesManager