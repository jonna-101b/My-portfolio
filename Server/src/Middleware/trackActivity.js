import ActivitiesModel from '../Models/activities.js';

/**
 * Helper to infer destination model name based on request baseUrl or URL path
 * @param {import('express').Request} req
 * @returns {string}
 */
const inferDestination = (req) => {
    const path = (req.baseUrl || req.originalUrl || '').toLowerCase();
    if (path.includes('qualifications')) return 'Qualifications';
    if (path.includes('projects')) return 'Projects';
    if (path.includes('blogs')) return 'Blogs';
    if (path.includes('testimonials')) return 'Testimonials';
    if (path.includes('skills')) return 'Skills';
    if (path.includes('profile')) return 'Profile';
    if (path.includes('notifications')) return 'Notifications';
    return 'Portfolio';
};

/**
 * Extracts a meaningful title from the response data, request body, or destination fallback
 * @param {any} body
 * @param {import('express').Request} req
 * @param {string} destination
 * @returns {string}
 */
const extractTitle = (body, req, destination) => {
    if (body) {
        if (typeof body === 'string') return body;

        // If the document has a title
        if (body.title && typeof body.title === 'string') return body.title;

        // For Qualifications: discipline (+ organization)
        if (body.discipline && typeof body.discipline === 'string') {
            return body.organization ? `${body.discipline} (${body.organization})` : body.discipline;
        }

        // For Skills: label or name
        if (body.label && typeof body.label === 'string') return body.label;
        if (body.name && typeof body.name === 'string') return body.name;

        // For Notifications: subject or name
        if (body.subject && typeof body.subject === 'string') return body.subject;

        // For Profile
        if (body.firstName || body.lastName) {
            return `${body.firstName || ''} ${body.lastName || ''}`.trim() || 'Profile Details';
        }
    }

    // Fallbacks from request payload
    if (req.body) {
        if (req.body.title) return req.body.title;
        if (req.body.discipline) {
            return req.body.organization ? `${req.body.discipline} (${req.body.organization})` : req.body.discipline;
        }
        if (req.body.label) return req.body.label;
        if (req.body.name) return req.body.name;
        if (req.body.subject) return req.body.subject;
    }

    return destination || 'Item';
};

/**
 * Core tracking handler intercepting res.json to track CUD actions
 */
const handleTracking = (config, req, res, next) => {
    const method = req.method.toUpperCase();

    // Only track CUD actions (POST, PUT, PATCH, DELETE)
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        return next();
    }

    let defaultAction = 'Updated';
    if (method === 'POST') defaultAction = 'Created';
    else if (method === 'DELETE') defaultAction = 'Deleted';

    const action = config.action || defaultAction;
    const destination = config.destination || inferDestination(req);

    const originalJson = res.json.bind(res);

    res.json = function (body) {
        // Run original res.json to preserve response lifecycle
        const responseResult = originalJson(body);

        // Only record activity if the controller finished with a successful status code (2xx)
        if (res.statusCode >= 200 && res.statusCode < 300) {
            setImmediate(async () => {
                try {
                    let title = '';
                    if (typeof config.getTitle === 'function') {
                        title = config.getTitle(body, req);
                    } else if (config.title) {
                        title = config.title;
                    } else {
                        title = extractTitle(body, req, destination);
                    }

                    if (!title) {
                        title = destination;
                    }

                    await ActivitiesModel.create({
                        action,
                        destination,
                        title: String(title).slice(0, 150),
                        date: new Date()
                    });
                } catch (err) {
                    console.error('[trackActivity] Failed to record activity log:', err?.message || err);
                }
            });
        }

        return responseResult;
    };

    next();
};

/**
 * Express middleware to track Create, Update, and Delete actions
 * @param {string|Object} [options] - Destination name or options object
 * @param {string} [customAction] - Optional action override ('Created', 'Updated', 'Deleted')
 */
const trackActivity = (options = {}, customAction) => {
    // If mounted directly as app.use(trackActivity)
    if (options && options.req && options.res && typeof customAction === 'function') {
        const req = options;
        const res = customAction;
        const next = arguments[2];
        return handleTracking({}, req, res, next);
    }

    let config = {};
    if (typeof options === 'string') {
        config.destination = options;
        if (customAction) config.action = customAction;
    } else if (typeof options === 'object' && options !== null) {
        config = { ...options };
    }

    return (req, res, next) => {
        handleTracking(config, req, res, next);
    };
};

export { trackActivity };
export default trackActivity;
