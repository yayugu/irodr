// MIT © 2017 azu
import * as React from "react";
import { UseCase, UseCaseExecutor } from "almin";
import { appLocator } from "../../AppLocator";

export interface BaseContainerProps {
    className?: string;
}

/**
 * Extends React.Component for Container.
 * It has executor feature for almin UseCase.
 */
export class BaseContainer<T, P> extends React.PureComponent<T & BaseContainerProps, P> {
    useCase<T extends UseCase>(useCase: T): UseCaseExecutor<T> {
        return appLocator.context.useCase(useCase);
    }
}
