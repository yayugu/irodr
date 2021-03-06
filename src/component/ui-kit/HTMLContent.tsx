import * as React from "react";
import classnames from "classnames";
import senitizeHTML from "sanitize-html";

export interface HTMLContentProps {
    children: string;
    className: string;
}

export class HTMLContent extends React.PureComponent<HTMLContentProps, {}> {
    render() {
        // remove un-safe tags like iframe
        const senitizedHTML = senitizeHTML(this.props.children, {
            allowedTags: [
                "img",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "blockquote",
                "p",
                "a",
                "ul",
                "ol",
                "nl",
                "li",
                "b",
                "i",
                "strong",
                "em",
                "del",
                "span",
                "strike",
                "code",
                "hr",
                "br",
                "div",
                "table",
                "thead",
                "caption",
                "tbody",
                "tr",
                "th",
                "td",
                "pre"
            ],
            allowedAttributes: {
                a: ["href", "name", "title"],
                img: ["src", "width", "height", "alt", "title"]
            },
            // Lots of these won't come up by default because we don't allow them
            selfClosing: ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta"],
            // URL schemes we permit
            allowedSchemes: ["http", "https"],
            allowedSchemesByTag: {},
            allowProtocolRelative: true
        });
        return (
            <div
                className={classnames("SubscriptionContentsContainer-contentBody", this.props.className)}
                dangerouslySetInnerHTML={{ __html: senitizedHTML }}
            />
        );
    }
}
