export const project = {
  id: '1',
  slug: 'delivery-app-project',
  name: 'Delivery App Project',
  dueDate: 'August 2025',
  updated: '3m ago',
  image: '/cat.png',
  completed: 75,
  recent: false,
  category: 'UI/UX Design',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid iudicant sensus? Primum quid tu dicis breve? Etiam beatissimum? Ne discipulum abducam, times.',
  meta: {
    sprintPerWeek: 2,
    monthDuration: 3,
    budgetType: 'Fixed'
  },
  owner: {
    id: 7,
    avatar: '/cat.png',
    badge: '/cat.png',
    role: 'Frontend Developer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
    name: 'Clarke G.',
    text: 'CG'
  },
  team: [
    {
      'id': 27,
      'src': '/cat.png',
      'badge': '/cat.png',
      'role': 'UI/UX Designer',
      'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
      'tooltip': 'Carmen E.',
      'data-nui-tooltip': 'Carmen E.',
      'text': 'CE'
    },
    {
      'id': 15,
      'src': '/cat.png',
      'badge': '/cat.png',
      'role': 'Fullstack Developer',
      'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
      'tooltip': 'Josh C.',
      'data-nui-tooltip': 'Josh C.',
      'text': 'JC'
    },
    {
      'id': 12,
      'src': '/cat.png',
      'badge': '/cat.png',
      'role': 'Backend Developer',
      'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
      'tooltip': 'Marjory L.',
      'data-nui-tooltip': 'Marjory L.',
      'text': 'ML'
    }
  ],
  files: [
    {
      id: 0,
      name: 'company-ux-guide.pdf',
      icon: '/cat.png',
      size: '4.7MB',
      version: '1.5.2',
      uploaded: '2 weeks ago',
      author: {
        name: 'Hermann M.',
        picture: '/cat.png'
      }
    },
    {
      id: 1,
      name: 'tech-summit-expenses.xlsx',
      icon: '/cat.png',
      size: '34KB',
      version: '1.1.3',
      uploaded: '3 days ago',
      author: {
        name: 'Beth M.',
        picture: '/cat.png'
      }
    },
    {
      id: 2,
      name: 'project-outline.docx',
      icon: '/cat.png',
      size: '77KB',
      version: '1.0.0',
      uploaded: '5 days ago',
      author: {
        name: 'Clark D.',
        picture: '/cat.png'
      }
    },
    {
      id: 3,
      name: 'ux-presentation.pptx',
      icon: '/cat.png',
      size: '2.3MB',
      version: '1.0.0',
      uploaded: '2 weeks ago',
      author: {
        name: 'Terry S.',
        picture: '/cat.png'
      }
    },
    {
      id: 4,
      name: 'website-homepage-redesign.ai',
      icon: '/cat.png',
      size: '4.8MB',
      version: '1.0.0',
      uploaded: '2 weeks ago',
      author: {
        name: 'Lana E.',
        picture: '/hero/random-4.avif'
      }
    },
    {
      id: 5,
      name: 'interns-ux-rampup.docx',
      icon: '/cat.png',
      size: '1.8MB',
      version: '1.2.0',
      uploaded: '3 days ago',
      author: {
        name: 'Howard L.',
        picture: '/hero/random-6.avif'
      }
    }
  ],
  tools: [
    {
      name: 'Sketch',
      description: 'Design Software',
      icon: '/cat.png'
    },
    {
      name: 'Illustrator',
      description: 'Design Software',
      icon: '/cat.png'
    },
    {
      name: 'Photoshop',
      description: 'Design Software',
      icon: '/cat.png'
    }
  ],
  stacks: [
    {
      name: 'Html5',
      description: 'Design Software',
      icon: '/cat.png'
    },
    {
      name: 'Javascript',
      description: 'Programming Language',
      icon: '/cat.png'
    },
    {
      name: 'Vue',
      description: 'Design Software',
      icon: '/cat.png'
    }
  ],
  tasks: [
    {
      id: 0,
      name: 'Create a new figma design for the new homepage elements',
      description:
        'We should have a collection of the most basic UI elements like buttons, badges and form elements. Then we should use these to create reusable section blocks that we can also use in other pages of the project.',
      completion: 100,
      status: 5,
      created: '2 days ago',
      assignee: {
        id: 27,
        src: '/hero/random-3.avif',
        badge: '/cat.png',
        role: 'UI/UX Designer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Carmen E.',
        text: 'CE'
      },
      files: [
        {
          id: 0,
          name: 'company-ux-guide.pdf',
          icon: '/cat.png',
          size: '4.7MB',
          version: '1.5.2',
          uploaded: '2 weeks ago',
          author: {
            name: 'Hermann M.',
            picture: '/hero/random-8.avif'
          }
        },
        {
          id: 1,
          name: 'project_sketches.ai',
          icon: '/cat.png',
          size: '8.9MB',
          version: '1.1.3',
          uploaded: 'a week ago',
          author: {
            name: 'Beth M.',
            picture: '/hero/random-2.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Create a set of button elements',
          done: true
        },
        {
          text: 'Create a set of badge elements',
          done: true
        },
        {
          text: 'Create a set of input elements',
          done: true
        },
        {
          text: 'Create a set of checkbox elements',
          done: true
        },
        {
          text: 'Create a set of card elements',
          done: true
        }
      ],
      comments: [
        {
          text: 'I think buttons corners should be a little more rounded.',
          author: {
            name: 'Marjory L.',
            picture: '/hero/random-1.avif',
            posted: '2 days ago'
          }
        },
        {
          text: 'Are you planning to add this as a global setting in the configuration file?',
          author: {
            name: 'Kendra W.',
            picture: '/hero/random-3.avif',
            posted: '2 days ago'
          }
        },
        {
          text: 'Not sure about it yet. Still need to check this out with the engineering team',
          author: {
            name: 'Marjory L.',
            picture: '/hero/random-1.avif',
            posted: '2 days ago'
          }
        }
      ]
    },
    {
      id: 1,
      name: 'Build a landing page template for future marketing campaigns',
      description:
        'The website should provide a customizable landing page template that can be used to support marketing campaigns. It should also be easily customizable by the marketing team.',
      completion: 58,
      status: 1,
      assignee: {
        id: 12,
        src: '/hero/random-7.avif',
        badge: '/cat.png',
        role: 'Backend Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Marjory L.',
        text: 'ML'
      },
      files: [
        {
          id: 0,
          name: 'ux-notes.docx',
          icon: '/cat.png',
          size: '89KB',
          version: '1.8.2',
          uploaded: '2 weeks ago',
          author: {
            name: 'Melany D.',
            picture: '/hero/random-3.avif'
          }
        },
        {
          id: 1,
          name: 'landing_page.ai',
          icon: '/cat.png',
          size: '4.2MB',
          version: '1.4.1',
          uploaded: '5 days ago',
          author: {
            name: 'Clarke C.',
            picture: '/hero/random-9.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Create a customizable hero section',
          done: true
        },
        {
          text: 'Create a customizable pricing section',
          done: true
        },
        {
          text: 'Create a customizable features section',
          done: true
        },
        {
          text: 'Create a customizable testimonials section',
          done: false
        },
        {
          text: 'Create a customizable contact section',
          done: false
        }
      ],
      created: '6 days ago',
      attachments: 2,
      comments: [
        {
          text: 'Iam wondering if we should add a section for the team members? it could be nice. And what about a section for the latest blog posts?',
          author: {
            name: 'Selena M.',
            picture: '/hero/random-8.avif',
            posted: '7 hours ago'
          }
        }
      ]
    },
    {
      id: 2,
      name: 'Build a custom javascript video player with streaming support',
      description:
        'Since we couldn\'t find an out of the box solution, we are forced to build a custom player that we can reuse in othe projects.',
      completion: 45,
      status: 1,
      created: '18 days ago',
      assignee: {
        id: 15,
        src: '/hero/random-8.avif',
        badge: '/cat.png',
        role: 'Fullstack Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Josh C.',
        text: 'JC'
      },
      files: [
        {
          id: 0,
          name: 'player_specifications.pdf',
          icon: '/cat.png',
          size: '2.9MB',
          version: '1.0.1',
          uploaded: '2 weeks ago',
          author: {
            name: 'Greta K.',
            picture: '/hero/random-4.avif'
          }
        },
        {
          id: 1,
          name: 'player-mockup.ai',
          icon: '/cat.png',
          size: '5.7MB',
          version: '1.0.0',
          uploaded: '5 days ago',
          author: {
            name: 'Beth M.',
            picture: '/hero/random-2.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Implement basic frame and controls',
          done: true
        },
        {
          text: 'Design and implement custom svg control icons',
          done: true
        },
        {
          text: 'Implement video streaming support',
          done: false
        },
        {
          text: 'Implement video playback speed control',
          done: true
        },
        {
          text: 'Implement video volume control',
          done: false
        }
      ],
      comments: [
        {
          text: 'Iam wondering if we should add several display modes for the player? It could be nice to have a fullscreen mode for example.',
          author: {
            name: 'Erik K.',
            picture: '/hero/random-1.avif',
            posted: '3 days ago'
          }
        },
        {
          text: 'Yeah, that would be nice. I will add it to the list of features. Anything else you can think of?',
          author: {
            name: 'Maya R.',
            picture: '/hero/random-7.avif',
            posted: '3 days ago'
          }
        },
        {
          text: 'I think that should be it for now. I will let you know if I think of anything else. Now that you say it, ahave you though about cusomtization and Tailwind CSS support?',
          author: {
            name: 'Erik K.',
            picture: '/hero/random-1.avif',
            posted: '3 days ago'
          }
        }
      ]
    },
    {
      id: 3,
      name: 'Design a set of custom branded illustrations for the website and the app',
      description:
        'The customer wants to have a set of illustrations that can be used on the website and the app. They should be custom branded and fit the overall design.',
      completion: 100,
      status: 5,
      created: '2 weeks ago',
      assignee: {
        id: 15,
        src: '/hero/random-8.avif',
        badge: '/cat.png',
        role: 'Fullstack Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Josh C.',
        text: 'JC'
      },
      files: [
        {
          id: 0,
          name: 'company_branding.pdf',
          icon: '/cat.png',
          size: '25.8MB',
          version: '4.5.2',
          uploaded: '1 month ago',
          author: {
            name: 'Lana H.',
            picture: '/hero/random-4.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Create illustrations for the landing page',
          done: true
        },
        {
          text: 'Rework svgs to use the currentColor for fill and stroke attributes',
          done: true
        },
        {
          text: 'Prepare svg parts that will be animated',
          done: true
        },
        {
          text: 'Work on a set of branded icons',
          done: false
        }
      ],
      comments: [
        {
          text: 'This is starting to look really good. I wonder if we should abstract the characters a little bit more? What do you guys think?',
          author: {
            name: 'Beth M.',
            picture: '/hero/random-2.avif',
            posted: '5 hours ago'
          }
        },
        {
          text: 'Looks good to me. I think we can start working on the icons now. I will add it to the list of features. Anything else you can think of?',
          author: {
            name: 'Maya R.',
            picture: '/hero/random-7.avif',
            posted: '2 hours ago'
          }
        },
        {
          text: 'I think that should be it for now. I will let you know if I think of anything else. Now that you say it, have you though about cusomtization and Tailwind CSS support?',
          author: {
            name: 'Kendra W.',
            picture: '/hero/random-8.avif',
            posted: '1 hour ago'
          }
        }
      ]
    },
    {
      id: 4,
      name: 'Implement a complete job offers API endpoint',
      description:
        'The API endpoint should return a JSON list of jobs. The endpoint should be able to filter the results by keyword, location, type and category.',
      completion: 65,
      status: 1,
      created: '2 weeks ago',
      assignee: {
        id: 7,
        src: '/hero/random-9.avif',
        badge: '/cat.png',
        role: 'Frontend Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Clarke G.',
        text: 'CG'
      },
      files: [
        {
          id: 0,
          name: 'api-jobs-specs.pdf',
          icon: '/cat.png',
          size: '1.2MB',
          version: '1.9.2',
          uploaded: '2 weeks ago',
          author: {
            name: 'Hermann M.',
            picture: '/hero/random-8.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Create a new API endpoint',
          done: true
        },
        {
          text: 'Create a new database table',
          done: true
        },
        {
          text: 'Create a new database migration',
          done: true
        },
        {
          text: 'Create a new database seeder',
          done: false
        },
        {
          text: 'Create a new database model',
          done: false
        }
      ],
      comments: [
        {
          text: 'I feel this architecture is not the best. I think we should use a different approach. What do you guys think?',
          author: {
            name: 'Rob H.',
            picture: '/hero/random-7.avif',
            posted: '2 days ago'
          }
        },
        {
          text: 'Yup, it looks clunky to me as well. Let\'s try something different. I will add it to the list of features. Anything else you can think of?',
          author: {
            name: 'John B.',
            picture: '/hero/random-5.avif',
            posted: '2 days ago'
          }
        },
        {
          text: 'I have sent some notes to the team. That should help them refactor the code.',
          author: {
            name: 'Kendra W.',
            picture: '/hero/random-8.avif',
            posted: '2 days ago'
          }
        }
      ]
    },
    {
      id: 5,
      name: 'Implement company users API endpoint',
      description:
        'The API endpoint should return a JSON list of users. The endpoint should be able to filter the results by keyword, location, type and category.',
      completion: 100,
      status: 0,
      created: '2 days ago',
      assignee: {
        id: 27,
        src: '/hero/random-3.avif',
        badge: '/cat.png',
        role: 'UI/UX Designer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Carmen E.',
        text: 'CE'
      },
      files: [
        {
          id: 0,
          name: 'api-users-specs.pdf',
          icon: '/cat.png',
          size: '1.2MB',
          version: '1.9.2',
          uploaded: '2 weeks ago',
          author: {
            name: 'Hermann M.',
            picture: '/hero/random-8.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Create a new API endpoint',
          done: true
        },
        {
          text: 'Create a new database table',
          done: true
        },
        {
          text: 'Create a new database migration',
          done: true
        },
        {
          text: 'Create a new database seeder',
          done: true
        },
        {
          text: 'Create a new database model',
          done: true
        }
      ],
      comments: [
        {
          text: 'I feel this architecture is not the best. I think we should use a different approach. What do you guys think?',
          author: {
            name: 'Betty L.',
            picture: '/hero/random-6.avif',
            posted: '2 days ago'
          }
        },
        {
          text: 'I have sent some notes to the team. That should help them refactor the code.',
          author: {
            name: 'John B.',
            picture: '/hero/random-5.avif',
            posted: '2 days ago'
          }
        },
        {
          text: 'Hold your horses! I am still working on it. I will let you know when I am done.',
          author: {
            name: 'Josh D.',
            picture: '/hero/random-9.avif',
            posted: '2 days ago'
          }
        }
      ]
    },
    {
      id: 6,
      name: 'Build a complete authentication system and API endpoint',
      description:
        'The authentication system should be able to handle user registration, login, logout, password reset and email verification. The API endpoint should return a Bearer token.',
      completion: 100,
      status: 0,
      created: '2 days ago',
      assignee: {
        id: 12,
        src: '/hero/random-8.avif',
        badge: '/cat.png',
        role: 'Backend Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Marjory L.',
        text: 'ML'
      },
      files: [
        {
          id: 0,
          name: 'api-auth-specs.pdf',
          icon: '/cat.png',
          size: '2.4MB',
          version: '1.0.0',
          uploaded: '3 weeks ago',
          author: {
            name: 'Josh S.',
            picture: '/hero/random-9.avif'
          }
        },
        {
          id: 1,
          name: 'authentication.docx',
          icon: '/cat.png',
          size: '34KB',
          version: '1.1.3',
          uploaded: '5 days ago',
          author: {
            name: 'Kendra W.',
            picture: '/hero/random-3.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Create a new API endpoint',
          done: true
        },
        {
          text: 'Create a new database table',
          done: true
        },
        {
          text: 'Create a new database migration',
          done: true
        },
        {
          text: 'Create a new database seeder',
          done: true
        },
        {
          text: 'Create a new database model',
          done: true
        }
      ],
      comments: []
    },
    {
      id: 7,
      name: 'Create reusable components to build different pricing sections',
      description:
        'The components should be able to handle different pricing plans and should be able to display the most popular plan. Also, the components should be able to display a button to purchase the plan.',
      completion: 100,
      status: 5,
      created: '2 weeks ago',
      assignee: {
        id: 12,
        src: '/hero/random-1.avif',
        badge: '/cat.png',
        role: 'Backend Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Marjory L.',
        text: 'ML'
      },
      files: [
        {
          id: 0,
          name: 'pricing-components.ai',
          icon: '/cat.png',
          size: '9.5MB',
          version: '1.0.0',
          uploaded: '5 days ago',
          author: {
            name: 'Ana B.',
            picture: '/hero/random-7.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Draw some first stage wireframes',
          done: true
        },
        {
          text: 'Design components in a Figma project',
          done: true
        },
        {
          text: 'Design pricing sections in the Figma project',
          done: true
        },
        {
          text: 'Implement the components in the project',
          done: true
        },
        {
          text: 'Implement the pricing sections in the project',
          done: true
        }
      ],
      comments: [
        {
          text: 'I like very much the design. There is just one thing I would change. I would make the button a bit bigger.',
          author: {
            name: 'Maya R.',
            picture: '/hero/random-7.avif',
            posted: '4 days ago'
          }
        },
        {
          text: 'Are you sure? I think the button is the right size. I will ask the team what they think.',
          author: {
            name: 'Beth M.',
            picture: '/hero/random-2.avif',
            posted: '2 days ago'
          }
        },
        {
          text: 'I think the button is fine. I would not change it.',
          author: {
            name: 'Hermann M.',
            picture: '/hero/random-8.avif',
            posted: '2 days ago'
          }
        }
      ]
    },
    {
      id: 8,
      name: 'Implement a user profile page',
      description:
        'The user profile page should display the user avatar, name, email, bio, location, social links and a list of the user projects.',
      completion: 100,
      status: 5,
      created: '3 weeks ago',
      assignee: {
        id: 27,
        src: '/hero/random-3.avif',
        badge: '/cat.png',
        role: 'UI/UX Designer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Carmen E.',
        text: 'CE'
      },
      files: [
        {
          id: 0,
          name: 'profile-view.ai',
          icon: '/cat.png',
          size: '4.7MB',
          version: '1.5.2',
          uploaded: '2 weeks ago',
          author: {
            name: 'Hermann M.',
            picture: '/hero/random-8.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Draw some first stage wireframes',
          done: true
        },
        {
          text: 'Design the user profile page in a Figma project',
          done: true
        },
        {
          text: 'Implement the user profile page in the project',
          done: true
        }
      ],
      comments: [
        {
          text: 'This looks great! I have just one question. How will the user change the avatar?',
          author: {
            name: 'Henry D.',
            picture: '/hero/random-7.avif',
            posted: '8 hours ago'
          }
        },
        {
          text: 'I think the user will be able to change the avatar from the settings page.',
          author: {
            name: 'Clarke C.',
            picture: '/hero/random-9.avif',
            posted: '8 hours ago'
          }
        }
      ]
    },
    {
      id: 9,
      name: 'Create a concept for a contact list page',
      description:
        'The contact list page should display a list of contacts with their name, email, phone number and avatar.',
      completion: 75,
      status: 3,
      created: '2 weeks ago',
      assignee: {
        id: 27,
        src: '/hero/random-3.avif',
        badge: '/cat.png',
        role: 'UI/UX Designer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Carmen E.',
        text: 'CE'
      },
      files: [
        {
          id: 0,
          name: 'contact-list.ai',
          icon: '/cat.png',
          size: '7.9MB',
          version: '1.1.1',
          uploaded: '2 weeks ago',
          author: {
            name: 'Hermann M.',
            picture: '/hero/random-8.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Draw some first stage wireframes',
          done: true
        },
        {
          text: 'Design the contact list page in a Figma project',
          done: true
        },
        {
          text: 'Implement the contact list page in the project',
          done: true
        },
        {
          text: 'Build a search functionality for the contact list page',
          done: false
        }
      ],
      comments: [
        {
          text: 'The filter is a great addition. I think it will be very useful.',
          author: {
            name: 'Melany L.',
            picture: '/hero/random-3.avif',
            posted: '6 hours ago'
          }
        },
        {
          text: 'That\'s the cherry on top of the cake. I think it\'s ready to be implemented.',
          author: {
            name: 'Kendra W.',
            picture: '/hero/random-8.avif',
            posted: '7 hours ago'
          }
        },
        {
          text: 'I agree. I will start working on the implementation.',
          author: {
            name: 'Hermann M.',
            picture: '/hero/random-1.avif',
            posted: '8 hours ago'
          }
        }
      ]
    },
    {
      id: 10,
      name: 'Implement a contact list API endpoint',
      description:
        'The contact list API endpoint should return a list of contacts with their name, email, phone number and avatar.',
      completion: 50,
      status: 1,
      created: '6 days ago',
      assignee: {
        id: 12,
        src: '/hero/random-1.avif',
        badge: '/cat.png',
        role: 'Backend Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Marjory L.',
        text: 'ML'
      },
      files: [
        {
          id: 0,
          name: 'contact-list-api.pdf',
          icon: '/cat.png',
          size: '4.7MB',
          version: '1.5.2',
          uploaded: '2 weeks ago',
          author: {
            name: 'Clarke C.',
            picture: '/hero/random-3.avif'
          }
        },
        {
          id: 1,
          name: 'contact-list-api.xlsx',
          icon: '/img/vector/files/sheet.svg',
          size: '34KB',
          version: '1.0.0',
          uploaded: '1 week ago',
          author: {
            name: 'Maya R.',
            picture: '/hero/random-7.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Create a new API endpoint for the contact list',
          done: true
        },
        {
          text: 'Create a new database table for the contact list',
          done: true
        },
        {
          text: 'Create a new database table for the contact list',
          done: true
        },
        {
          text: 'Create a new database table for the contact list',
          done: false
        },
        {
          text: 'Create filter queries and pagination for the contact list',
          done: false
        }
      ],
      comments: [
        {
          text: 'I think we should add a search functionality to the contact list.',
          author: {
            name: 'Lana E.',
            picture: '/hero/random-4.avif',
            posted: '2 hours ago'
          }
        },
        {
          text: 'I agree. I will add it to the checklist.',
          author: {
            name: 'Kendra W.',
            picture: '/hero/random-3.avif',
            posted: '2 days ago'
          }
        }
      ]
    },
    {
      id: 11,
      name: 'Implement a messaging frontend for contacts',
      description:
        'The messaging frontend should allow users to send messages to each other. The messages should be stored in a database. The frontend should be implemented in React.',
      completion: 100,
      status: 5,
      created: '2 weeks ago',
      assignee: {
        id: 7,
        src: '/hero/random-9.avif',
        badge: '/cat.png',
        role: 'Frontend Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Clarke G.',
        text: 'CG'
      },
      files: [
        {
          id: 0,
          name: 'messaging-frontend.ai',
          icon: '/cat.png',
          size: '7.1MB',
          version: '1.0.0',
          uploaded: '2 weeks ago',
          author: {
            name: 'Elias D.',
            picture: '/hero/random-9.avif'
          }
        },
        {
          id: 1,
          name: 'messaging-frontend.pdf',
          icon: '/cat.png',
          size: '1.2MB',
          version: '1.0.0',
          uploaded: '6 days ago',
          author: {
            name: 'Josh D.',
            picture: '/hero/random-6.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Create new components for the messaging frontend',
          done: true
        },
        {
          text: 'Add a new route for the messaging frontend',
          done: true
        },
        {
          text: 'Create a new database table for the messages',
          done: true
        },
        {
          text: 'Implement the messaging functionality',
          done: true
        }
      ],
      comments: [
        {
          text: 'I think we should add the ability to send images and files. What do you think?',
          author: {
            name: 'Beth M.',
            picture: '/hero/random-2.avif',
            posted: '2 days ago'
          }
        },
        {
          text: 'Iam not sure if we should add this. It would be a lot of work. What do you think @Hermann M.?',
          author: {
            name: 'Josh D.',
            picture: '/hero/random-6.avif',
            posted: '2 days ago'
          }
        },
        {
          text: 'I think we should add it. It would be a nice feature.',
          author: {
            name: 'Hermann M.',
            picture: '/hero/random-1.avif',
            posted: '2 days ago'
          }
        }
      ]
    },
    {
      id: 12,
      name: 'Implement a messaging API endpoint for the frontend',
      description:
        'The messaging API endpoint should allow users to send messages to each other. The messages should be stored in a database. The API endpoint should be implemented in Node.js.',
      completion: 65,
      status: 1,
      created: '3 weeks ago',
      assignee: {
        id: 7,
        src: '/hero/random-9.avif',
        badge: '/cat.png',
        role: 'Frontend Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        tooltip: 'Clarke G.',
        text: 'CG'
      },
      files: [
        {
          id: 0,
          name: 'messaging-api-endpoint.pdf',
          icon: '/cat.png',
          size: '2.2MB',
          version: '1.0.2',
          uploaded: '2 weeks ago',
          author: {
            name: 'Kendra W.',
            picture: '/hero/random-8.avif'
          }
        }
      ],
      checklist: [
        {
          text: 'Create a new API endpoint for the messaging frontend',
          done: true
        },
        {
          text: 'Implement the messaging functionality',
          done: true
        },
        {
          text: 'Save the messages in a database',
          done: false
        }
      ],
      comments: [
        {
          text: 'I have been doing some heavy lifting on this. I think we should defintiely add the ability to send images and files. What do you think?',
          author: {
            name: 'Clarke C.',
            picture: '/hero/random-9.avif',
            posted: '10 hours ago'
          }
        }
      ]
    }
  ],
  customer: {
    logo: '/cat.png',
    name: 'Flashlite',
    text: 'Delivery'
  }
}
