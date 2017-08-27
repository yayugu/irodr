// MIT © 2017 azu
import { StreamContentResponse, StreamContentsResponse } from "../../../infra/api/StreamContentsResponse";
import { SubscriptionContent, SubscriptionContentIdentifier } from "./SubscriptionContent";
import { SubscriptionContentBody } from "./SubscriptionContentBody";
import { SubscriptionContents } from "./SubscriptionContents";

export const createSubscriptionContentsFromResponse = (
    streamContentResponse: StreamContentsResponse
): SubscriptionContents => {
    const contentList = streamContentResponse.items.map(item => {
        return createSubscriptionContentFromResponse(item);
    });
    return new SubscriptionContents(contentList);
};

export const createSubscriptionContentFromResponse = (
    streamContentResponse: StreamContentResponse
): SubscriptionContent => {
    return new SubscriptionContent({
        id: new SubscriptionContentIdentifier(streamContentResponse.id),
        url: streamContentResponse.canonical[0].href,
        title: streamContentResponse.title,
        author: streamContentResponse.author,
        body: new SubscriptionContentBody(streamContentResponse.summary.content),
        publishedDate: new Date(streamContentResponse.published),
        updatedDate: new Date(streamContentResponse.updated)
    });
};
