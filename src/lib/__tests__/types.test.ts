import {
  BlogSlug,
  ProjectId,
  WithOptional,
  RequireAtLeastOne,
  Project,
  BlogPost,
  ContactForm,
  NewsletterForm,
  BaseComponentProps,
  NavigationComponentProps
} from '../types'

describe('Type utilities', () => {
  describe('Branded types', () => {
    it('should allow BlogSlug to be assigned from string', () => {
      const slug: BlogSlug = 'test-slug' as BlogSlug
      expect(typeof slug).toBe('string')
      expect(slug).toBe('test-slug')
    })

    it('should allow ProjectId to be assigned from string', () => {
      const id: ProjectId = 'project-123' as ProjectId
      expect(typeof id).toBe('string')
      expect(id).toBe('project-123')
    })

    it('should maintain type safety for branded types', () => {
      const slug: BlogSlug = 'test-slug' as BlogSlug
      const projectId: ProjectId = 'project-123' as ProjectId

      // These should be different types even though both are strings
      expect(typeof slug).toBe('string')
      expect(typeof projectId).toBe('string')
    })
  })

  describe('Utility types', () => {
    interface TestInterface {
      required: string
      optional: number
      another: boolean
    }

    it('should handle WithOptional type correctly', () => {
      type TestWithOptional = WithOptional<TestInterface, 'optional'>

      const validObject: TestWithOptional = {
        required: 'test',
        another: true
        // optional is now optional
      }

      const validObjectWithOptional: TestWithOptional = {
        required: 'test',
        optional: 42,
        another: true
      }

      expect(validObject.required).toBe('test')
      expect(validObject.another).toBe(true)
      expect(validObjectWithOptional.optional).toBe(42)
    })

    it('should handle RequireAtLeastOne type correctly', () => {
      interface TestOptions {
        a?: string
        b?: number
        c?: boolean
      }

      type RequireAtLeastOneOption = RequireAtLeastOne<TestOptions>

      const validWithA: RequireAtLeastOneOption = { a: 'test' }
      const validWithB: RequireAtLeastOneOption = { b: 42 }
      const validWithC: RequireAtLeastOneOption = { c: true }
      const validWithMultiple: RequireAtLeastOneOption = { a: 'test', b: 42 }

      expect(validWithA.a).toBe('test')
      expect(validWithB.b).toBe(42)
      expect(validWithC.c).toBe(true)
      expect(validWithMultiple.a).toBe('test')
      expect(validWithMultiple.b).toBe(42)
    })
  })

  describe('Event handler types', () => {
    it('should define NavigationHandler correctly', () => {
      const mockHandler = jest.fn()
      const handler: import('../types').NavigationHandler = mockHandler

      handler('/test-url')
      expect(mockHandler).toHaveBeenCalledWith('/test-url')
    })

    it('should define ClickHandler correctly', () => {
      const mockHandler = jest.fn()
      const handler: import('../types').ClickHandler = mockHandler

      handler()
      expect(mockHandler).toHaveBeenCalledWith()
    })
  })

  describe('Interface types', () => {
    it('should define Project interface correctly', () => {
      const project: Project = {
        id: 'project-1' as ProjectId,
        title: 'Test Project',
        description: 'A test project description',
        longDescription: 'A longer description',
        technologies: ['React', 'TypeScript'],
        githubUrl: 'https://github.com/user/repo',
        liveUrl: 'https://example.com',
        imageUrl: '/images/project.jpg',
        featured: true,
        createdAt: '2024-01-01'
      }

      expect(project.id).toBe('project-1')
      expect(project.title).toBe('Test Project')
      expect(project.technologies).toEqual(['React', 'TypeScript'])
      expect(project.featured).toBe(true)
    })

    it('should allow optional fields in Project interface', () => {
      const minimalProject: Project = {
        id: 'project-2' as ProjectId,
        title: 'Minimal Project',
        description: 'Basic description',
        technologies: ['JavaScript'],
        featured: false,
        createdAt: '2024-01-01'
      }

      expect(minimalProject.longDescription).toBeUndefined()
      expect(minimalProject.githubUrl).toBeUndefined()
      expect(minimalProject.liveUrl).toBeUndefined()
      expect(minimalProject.imageUrl).toBeUndefined()
    })

    it('should define BlogPost interface correctly', () => {
      const blogPost: BlogPost = {
        slug: 'test-post' as BlogSlug,
        title: 'Test Blog Post',
        description: 'A test blog post description',
        content: 'The blog post content',
        publishedAt: '2024-01-01',
        tags: ['react', 'testing'],
        readingTime: 5,
        featured: true
      }

      expect(blogPost.slug).toBe('test-post')
      expect(blogPost.tags).toEqual(['react', 'testing'])
      expect(blogPost.readingTime).toBe(5)
      expect(blogPost.featured).toBe(true)
    })

    it('should allow optional featured field in BlogPost', () => {
      const blogPostWithoutFeatured: BlogPost = {
        slug: 'another-post' as BlogSlug,
        title: 'Another Post',
        description: 'Description',
        content: 'Content',
        publishedAt: '2024-01-01',
        tags: ['typescript'],
        readingTime: 3
      }

      expect(blogPostWithoutFeatured.featured).toBeUndefined()
    })

    it('should define ContactForm interface correctly', () => {
      const contactForm: ContactForm = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message content'
      }

      expect(contactForm.name).toBe('John Doe')
      expect(contactForm.email).toBe('john@example.com')
      expect(contactForm.subject).toBe('Test Subject')
      expect(contactForm.message).toBe('Test message content')
    })

    it('should define NewsletterForm interface correctly', () => {
      const newsletterForm: NewsletterForm = {
        email: 'user@example.com',
        firstName: 'Jane'
      }

      expect(newsletterForm.email).toBe('user@example.com')
      expect(newsletterForm.firstName).toBe('Jane')
    })
  })

  describe('Component prop types', () => {
    it('should define BaseComponentProps correctly', () => {
      const baseProps: BaseComponentProps = {
        className: 'test-class',
        children: 'Test children'
      }

      expect(baseProps.className).toBe('test-class')
      expect(baseProps.children).toBe('Test children')
    })

    it('should allow optional fields in BaseComponentProps', () => {
      const minimalProps: BaseComponentProps = {}

      expect(minimalProps.className).toBeUndefined()
      expect(minimalProps.children).toBeUndefined()
    })

    it('should define NavigationComponentProps correctly', () => {
      const mockOnNavClick = jest.fn()
      const mockIsActiveItem = jest.fn(() => true)

      const navProps: NavigationComponentProps = {
        className: 'nav-class',
        children: 'Nav content',
        onNavClick: mockOnNavClick,
        isActiveItem: mockIsActiveItem
      }

      expect(navProps.className).toBe('nav-class')
      expect(navProps.children).toBe('Nav content')

      navProps.onNavClick('/test')
      expect(mockOnNavClick).toHaveBeenCalledWith('/test')

      const isActive = navProps.isActiveItem('/test')
      expect(mockIsActiveItem).toHaveBeenCalledWith('/test')
      expect(isActive).toBe(true)
    })

    it('should extend BaseComponentProps in NavigationComponentProps', () => {
      const mockOnNavClick = jest.fn()
      const mockIsActiveItem = jest.fn(() => false)

      const navProps: NavigationComponentProps = {
        onNavClick: mockOnNavClick,
        isActiveItem: mockIsActiveItem
      }

      // Should inherit optional properties from BaseComponentProps
      expect(navProps.className).toBeUndefined()
      expect(navProps.children).toBeUndefined()
    })
  })

  describe('Type compatibility', () => {
    it('should maintain type relationships between interfaces', () => {
      const project: Project = {
        id: 'test-id' as ProjectId,
        title: 'Test',
        description: 'Description',
        technologies: ['React'],
        featured: true,
        createdAt: '2024-01-01'
      }

      const blogPost: BlogPost = {
        slug: 'test-slug' as BlogSlug,
        title: 'Test Post',
        description: 'Description',
        content: 'Content',
        publishedAt: '2024-01-01',
        tags: ['test'],
        readingTime: 5
      }

      expect(typeof project.id).toBe('string')
      expect(typeof blogPost.slug).toBe('string')
      expect(Array.isArray(project.technologies)).toBe(true)
      expect(Array.isArray(blogPost.tags)).toBe(true)
    })
  })
})