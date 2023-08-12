import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    tagTypes: ['Comment', 'SingleBlog', "Blog", 'UserBlog', 'User'],
    endpoints: (builder) => ({
        //Register User
        registerUser: builder.mutation({
            query: body => ({
                url: '/users',
                method: 'POST',
                body: body,
                credentials: 'include'
            })
        }),
        //Login User
        loginUser: builder.mutation({
            query: body => ({
                url: '/users/login',
                method: 'POST',
                body: body,
                credentials: 'include'
            })
        }),
        //Logout User
        logoutUser: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
                credentials: 'include'
            })
        }),
        //Create Blog
        createBlogPost: builder.mutation({
            query: body => ({
                url: '/blogs',
                method: 'POST',
                body: body,
                credentials: 'include'
            }),
        }),
        //Get Blog
        getBlogPost: builder.query({
            query: (blogId) => ({
                url: `/blogs/${blogId}`
            }),
            providesTags: ['SingleBlog']

        }),
        //Get All Blogs
        getBlogs: builder.query({
            query: (category) => `/blogs?category=${category}`,
            providesTags: ['Blog']
        }),
        
        //Get User Blogs
        getUserBlogs: builder.query({
                query:(id)=>({
                    url: `/blogs/user-blog/${id}`
                }),
                providesTags: ['UserBlog']
        }),
        
        //Create Comment
        makeComment: builder.mutation({
            query: cb => ({
                url: '/comments',
                method: 'POST',
                body: cb,
                credentials: 'include'
            }),
            invalidatesTags: ['Comment', 'SingleBlog', 'Blog']
        }),
        getComments: builder.query({
            query: id => ({
                url: `/comments/${id}`
            }),
            providesTags: ['Comment']
        }),
        updateBlogPost: builder.mutation({
            query: ({blogId, formData})=>({
                url: `/blogs/${blogId}`,
                method: 'PUT',
                body: formData,
                credentials: 'include'
            }),
            invalidatesTags:['SingleBlog', 'Blog']
        }),
        updateUser: builder.mutation({
            query: (body)=>({
                url: '/users/profile',
                method: 'PUT',
                body: body,
                credentials: 'include'
            }),
            invalidatesTags: ['UserBlog', 'User']
        }),
        getUser: builder.query({
            query: id=>`/users/${id}`,
            providesTags: ['User']
        })

    })
})

export const { useRegisterUserMutation, useGetUserQuery, useUpdateUserMutation, useGetUserBlogsQuery, useLogoutUserMutation, useLoginUserMutation, useCreateBlogPostMutation, useUpdateBlogPostMutation, useGetBlogPostQuery, useGetBlogsQuery, useMakeCommentMutation, useGetCommentsQuery } = apiSlice
export default apiSlice