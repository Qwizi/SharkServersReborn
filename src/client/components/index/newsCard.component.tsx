import {Button, Card, Media} from "react-bootstrap";
import React from "react";
import Link from "next/link";

export const NewsCard = ({title, content, slug}) => {
    return (
        <Card>
            <Card.Body>
                <Media>
                   {/* <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src="holder.js/64x64"
                        alt="Generic placeholder"
                    />*/}
                    <Media.Body>
                        <h5>{title}</h5>
                        <p>
                            {content}
                        </p>
                    </Media.Body>
                </Media>
                <Card.Footer className={"text-right"}>
                    <Link href={`/news/${slug}`}>
                        <Button variant={"secondary"} size={"sm"}>Czytaj dalej</Button>
                    </Link>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}