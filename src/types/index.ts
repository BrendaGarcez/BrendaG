export interface Project {
    id: string
    title: string
    description: string
    long_description?: string
    stack: string[]
    category: ProjectCategory
    github_url?: string
    demo_url?: string
    image_url?: string
    featured: boolean
    created_at: string
}

export type ProjectCategory = 
    | 'devops'
    | 'backend'
    | 'frontend'
    | 'automation'
    | 'fullstack'


export interface Skill {
    name: string
    level: number
    category: SkillCategory
    icon?: string
}

export type SkillCategory = 
    | 'languages'
    | 'devops'
    | 'cloud'
    | 'databases'
    | 'tools'

export interface NavLink {
    label: string
    path: string
}

export interface AdminUser {
    id: string
    email: string
}

export type ApiResponse<T> = {
    data: T | null
    error: string | null
    loading: boolean
}