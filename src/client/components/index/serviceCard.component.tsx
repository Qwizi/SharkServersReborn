import {Badge, Button, Card, ListGroup} from "react-bootstrap";

export const ServiceCard = ({title, days, items}) => {
    return (
        <Card className="text-center">
            <Card.Title>
                {title}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
                <Badge variant={"primary"}>{days} DNI</Badge>
            </Card.Subtitle>
            <ListGroup>
                {items && items.map(item =>
                    <ListGroup.Item>{item}</ListGroup.Item>
                )}
            </ListGroup>
            <Card.Footer>
                <Button variant={"primary"}>Kupuje</Button>
            </Card.Footer>
        </Card>
    )
}