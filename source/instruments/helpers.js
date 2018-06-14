export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const taskComparator = (firstTask, secondTask) => {

    if (!firstTask.get('favorite') && secondTask.get('favorite')) {
        return 1;
    }

    if (firstTask.get('completed') && !secondTask.get('completed')) {
        return 1;
    }

    return 0;
};
