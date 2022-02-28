export default {
  valid: {
    suggestions: {
      took: 21,
      timed_out: false,
      _shards: {
        total: 1,
        successful: 1,
        skipped: 0,
        failed: 0,
      },
      hits: {
        total: {
          value: 0,
          relation: 'eq',
        },
        max_score: null,
        hits: [],
      },
      suggest: {
        title_suggest: [
          {
            text: 'art',
            offset: 0,
            length: 3,
            options: [
              {
                text: 'Artificial intelligence and M&A: Are you getting t',
                _index: 'tech-effect',
                _type: '_doc',
                _id: '40',
                _score: 2.0,
                _source: {
                  image:
                    '/content/dam/pwc/us/en/tech-effect/content/images/article-hero/te-pattern-dots-rose.png',
                  description:
                    'The sophistication of AI is accelerating—making deals involving this emerging technology both a challenge and an opportunity.',
                  title:
                    'Artificial intelligence and M&A: Are you getting the value you paid for? ',
                  url: 'https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-deals.html',
                },
              },
              {
                text: 'Artificial intelligence: Does your organization kn',
                _index: 'tech-effect',
                _type: '_doc',
                _id: '89',
                _score: 2.0,
                _source: {
                  image:
                    '/content/dam/pwc/us/en/tech-effect/content/images/article-hero/te-pattern-rubix-rose.png',
                  description:
                    'Seven key areas organizations should consider when incorporating artificial intelligence (AI) into their business operations and processes.',
                  title:
                    'Artificial intelligence: Does your organization know what the risks are?',
                  url: 'https://www.pwc.com/us/en/tech-effect/ai-analytics/managing-ai-risks.html',
                },
              },
              {
                text: 'Autodesk’s digital transformation using IAM',
                _index: 'tech-effect',
                _type: '_doc',
                _id: '96',
                _score: 1.0,
                _source: {
                  image:
                    '/content/dam/pwc/us/en/tech-effect/content/images/cta/casestudy-autodesk.jpg',
                  description:
                    'How Autodesk was able to use Identity and Access Management (IAM) as a catalyst for digital transformation and their next generation workforce.',
                  title: 'Autodesk’s digital transformation using IAM',
                  url: 'https://www.pwc.com/us/en/tech-effect/ghosts/cybersecurity/autodesk-identity-access-management-digital-transformation.html',
                },
              },
              {
                text: 'Automating trust',
                _index: 'tech-effect',
                _type: '_doc',
                _id: '84',
                _score: 1.0,
                _source: {
                  image:
                    '/content/dam/pwc/us/en/tech-effect/content/images/asset-hero/te-pattern-slimhero-3-grey.png',
                  description:
                    'Learn how technologies like blockchain, internet of things and AI offers companies new ways to track, secure, and verify their assets.',
                  title: 'Automating trust',
                  url: 'https://www.pwc.com/us/en/tech-effect/emerging-tech/automating-trust.html',
                },
              },
            ],
          },
        ],
      },
    },
  },
};
