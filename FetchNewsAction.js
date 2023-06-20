const { ActionComponent } = require('admin-bro');
const fetchAndSaveNews = require('./_script/fetchAndSaveNews');

const FetchNewsAction = (props) => {
    const { resource, record, actionPerformed } = props;

    const handleClick = async () => {
        try {
            await fetchAndSaveNews();
            actionPerformed({ notice: { message: 'Successfully fetched and saved news', type: 'success' } });
        } catch (error) {
            console.error('Error fetching and saving news:', error);
            actionPerformed({ notice: { message: 'Failed to fetch and save news', type: 'error' } });
        }
    };

    return ActionComponent({ ...props }, [
        ['button', { onClick: handleClick }, 'Fetch News']
    ]);
};

module.exports = FetchNewsAction;
