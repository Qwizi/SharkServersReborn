import {Button, Card, Media} from "react-bootstrap";
import React from "react";

export const NewsCard = () => {
    return (
        <Card>
            <Card.Body>
                <Media>
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src="holder.js/64x64"
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h5>Media Heading</h5>
                        <p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                            ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                            tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                            Donec lacinia congue felis in faucibus.
                        </p>
                    </Media.Body>
                </Media>
                <Card.Footer className={"text-right"}>
                    <Button variant={"secondary"} size={"sm"}>Czytaj dalej</Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}