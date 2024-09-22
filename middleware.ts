export {default} from 'next-auth/middleware'

export const config = {
    matcher: [
        // redirected user to new page if not authenticated
        '/issues/new',
        '/issues/edit/:id+',
    ]
}