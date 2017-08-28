// MIT © 2017 azu
import { Subscription } from "../../domain/Subscriptions/Subscription";
import { SubscriptionGroupByCategoryMap } from "../../domain/Subscriptions/InfraSubscription";
import { NullableRepository } from "ddd-base";

export class SubscriptionRepository extends NullableRepository<Subscription> {
    categoryMap: SubscriptionGroupByCategoryMap;

    constructor() {
        super();
        this.categoryMap = new SubscriptionGroupByCategoryMap();
    }

    groupByCategory() {
        return this.categoryMap;
    }

    getAllCategoryNames() {
        return this.categoryMap.keys();
    }

    getAllByCategories(category: string) {
        return this.categoryMap.get(category);
    }

    save(subscription: Subscription) {
        super.save(subscription);
        subscription.categories.forEach(category => {
            if (this.categoryMap.has(category)) {
                this.categoryMap.set(category, this.categoryMap.get(category)!.concat(subscription));
            } else {
                this.categoryMap.set(category, [subscription]);
            }
            this.categoryMap.versionUp();
        });
    }
}

export const subscriptionRepository = new SubscriptionRepository();
