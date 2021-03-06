import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
    transition('results => details', [
        style({position: 'relative'}),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%'
            })
        ]),
        query(':enter', [style({ right: '-100%', opacity:0})]),
        query(':leave', animateChild()),
        group([
            query(':leave', [animate('0.3s', style({
                right: '100%', opacity: 0
            }))]),
            query(':enter', [animate('0.3s', style({
                right: '0%', opacity: 1
            }))])
        ]),
        query(':enter', animateChild())
    ]),
    transition('details => results', [
        style({position: 'relative'}),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ]),
        query(':enter', [style({ left: '-100%', opacity:0})]),
        query(':leave', animateChild()),
        group([
            query(':leave', [animate('0.3s', style({
                left: '100%', opacity: 0
            }))]),
            query(':enter', [animate('0.3s', style({
                left: '0%', opacity: 1
            }))])
        ]),
        query(':enter', animateChild())
    ])
]);