import { faker } from '@faker-js/faker';

import { labels, priorities, statuses } from './data';

export const generateTasks = (count = 100) => {
    const tasks = Array.from({ length: count }, () => ({
        id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
        title: faker.hacker
            .phrase()
            .replace(/^./, letter => letter.toUpperCase()),
        status: faker.helpers.arrayElement(statuses).value,
        label: faker.helpers.arrayElement(labels).value,
        priority: faker.helpers.arrayElement(priorities).value,
    }));
    return tasks;
};
