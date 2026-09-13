import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions, getSubscriptionDetails, getAllSubscription, updateSubscription, cancelSubscription, deleteSubscription, getUpcomingRenewals } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', getAllSubscription);

subscriptionRouter.get('/:id', authorize, getSubscriptionDetails);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.patch('/:id', authorize, updateSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

subscriptionRouter.get('/renewals/upcoming', authorize, getUpcomingRenewals);

export default subscriptionRouter;