--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE
  images (
    id INTEGER PRIMARY KEY,
    filename TEXT NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    caption TEXT NOT NULL,
    isFeatured INTEGER NOT NULL CHECK (isFeatured IN (0, 1)),
    sequence INTEGER NOT NULL
  );

INSERT INTO
  images (
    filename,
    width,
    height,
    caption,
    isFeatured,
    sequence
  )
VALUES
  (
    '7596e105-0c32-46ec-9f69-60f40b20b2bc.jpeg',
    4032,
    3024,
    'Goes',
    TRUE,
    1
  ),
  (
    'bd583951-5016-42e7-a0e3-408e111f2e34.jpeg',
    4032,
    3024,
    'Goes',
    TRUE,
    1
  ),
  (
    '4e673ecf-0edf-44c1-9770-de5e0459614a.jpeg',
    4032,
    3024,
    'Indonesië',
    TRUE,
    1
  );

CREATE TABLE
  posts (
    id INTEGER PRIMARY KEY,
    created TEXT NOT NULL DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'now')) CHECK (
      created IS STRFTIME('%Y-%m-%dT%H:%M:%fZ', created)
    ),
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    draft JSON NOT NULL CHECK (
      draft ->> '$[0].type' = 'title'
      AND draft ->> '$[0].content[0].text' IS NOT NULL
      AND draft ->> '$[0].content[0].text' <> ''
    ),
    content JSON CHECK (
      content IS NULL
      OR (
        content ->> '$[0].type' = 'title'
        AND content ->> '$[0].content[0].text' IS NOT NULL
        AND content ->> '$[0].content[0].text' <> ''
      )
    ),
    tags TEXT NOT NULL,
    isPublished INTEGER NOT NULL CHECK (
      isPublished = 0
      OR (
        isPublished = 1
        AND content IS NOT NULL
        AND slug <> ''
      )
    ),
    isListed INTEGER NOT NULL CHECK (isListed IN (0, 1)),
    isFeatured INTEGER NOT NULL CHECK (isFeatured IN (0, 1))
  );

INSERT INTO
  posts (
    slug,
    summary,
    draft,
    content,
    tags,
    isPublished,
    isListed,
    isFeatured
  )
VALUES
  (
    'why-running-is-great',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.',
    '[{"type":"title","content":[{"type":"text","text":"Why running is great"}]},{"type":"image","attrs":{"filename":"7596e105-0c32-46ec-9f69-60f40b20b2bc.jpeg","width":4000, "height":3000,"size":1,"alt":""},"content":[{"type":"text","text":"Lorem ipsum dolor sit amet"}]},{"type":"paragraph","content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam mmalesuada erat ut turpis. Suspendisse urna nibh viverra "},{"type":"text","marks":[{"type":"code"}],"text":"non semper"},{"type":"text","text":" suscipit posuere a pede. Donec nec justo eget felis facilisis fermentum. Aliquam "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://nos.nl"}}],"text":"porttitor"},{"type":"text","text":" mauris sit amet orci. Aenean dignissim pellentesque felis."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Running is better when you approach it as a team sport."}]}]},{"type":"paragraph","content":[{"type":"text","text":"There are several benefits to running:"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Fitness"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Being outdoor"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Happiness"}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Now, let me show you some code:"}]},{"type":"code_block","content":[{"type":"text","text":"return {\n  void(0);\n}"}]}]',
    '[{"type":"title","content":[{"type":"text","text":"Why running is great"}]},{"type":"paragraph","content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam mmalesuada erat ut turpis. Suspendisse urna nibh viverra "},{"type":"text","marks":[{"type":"code"}],"text":"non semper"},{"type":"text","text":" suscipit posuere a pede. Donec nec justo eget felis facilisis fermentum. Aliquam "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://nos.nl"}}],"text":"porttitor"},{"type":"text","text":" mauris sit amet orci. Aenean dignissim pellentesque felis."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Running is better when you approach it as a team sport."}]}]},{"type":"paragraph","content":[{"type":"text","text":"There are several benefits to running:"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Fitness"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Being outdoor"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Happiness"}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Now, let me show you some code:"}]},{"type":"code_block","content":[{"type":"text","text":"return {\n  void(0);\n}"}]}]',
    'running',
    1,
    1,
    1
  ),
  (
    'why-coding-is-a-good-skill-to-have',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.',
    '[{"type":"title","content":[{"type":"text","text":"Why coding is a good skill to have"}]},{"type":"paragraph","content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam mmalesuada erat ut turpis. Suspendisse urna nibh viverra "},{"type":"text","marks":[{"type":"code"}],"text":"non semper"},{"type":"text","text":" suscipit posuere a pede. Donec nec justo eget felis facilisis fermentum. Aliquam "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://nos.nl"}}],"text":"porttitor"},{"type":"text","text":" mauris sit amet orci. Aenean dignissim pellentesque felis."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Running is better when you approach it as a team sport."}]}]},{"type":"paragraph","content":[{"type":"text","text":"There are several benefits to running:"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Fitness"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Being outdoor"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Happiness"}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Now, let me show you some code:"}]},{"type":"code_block","content":[{"type":"text","text":"return {\n  void(0);\n}"}]}]',
    '[{"type":"title","content":[{"type":"text","text":"Why coding is a good skill to have"}]},{"type":"paragraph","content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam mmalesuada erat ut turpis. Suspendisse urna nibh viverra "},{"type":"text","marks":[{"type":"code"}],"text":"non semper"},{"type":"text","text":" suscipit posuere a pede. Donec nec justo eget felis facilisis fermentum. Aliquam "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://nos.nl"}}],"text":"porttitor"},{"type":"text","text":" mauris sit amet orci. Aenean dignissim pellentesque felis."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Running is better when you approach it as a team sport."}]}]},{"type":"paragraph","content":[{"type":"text","text":"There are several benefits to running:"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Fitness"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Being outdoor"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Happiness"}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Now, let me show you some code:"}]},{"type":"code_block","content":[{"type":"text","text":"return {\n  void(0);\n}"}]}]',
    'coding',
    1,
    1,
    1
  ),
  (
    'why-running-complements-coding',
    'Quisque volutpat mattis eros. Nullam mmalesuada erat ut turpis. Suspendisse urna nibh viverra',
    '[{"type":"title","content":[{"type":"text","text":"Running complements coding really well"}]},{"type":"paragraph","content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam mmalesuada erat ut turpis. Suspendisse urna nibh viverra "},{"type":"text","marks":[{"type":"code"}],"text":"non semper"},{"type":"text","text":" suscipit posuere a pede. Donec nec justo eget felis facilisis fermentum. Aliquam "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://nos.nl"}}],"text":"porttitor"},{"type":"text","text":" mauris sit amet orci. Aenean dignissim pellentesque felis."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Running is better when you approach it as a team sport."}]}]},{"type":"paragraph","content":[{"type":"text","text":"There are several benefits to running:"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Fitness"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Being outdoor"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Happiness"}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Now, let me show you some code:"}]},{"type":"code_block","content":[{"type":"text","text":"return {\n  void(0);\n}"}]}]',
    '[{"type":"title","content":[{"type":"text","text":"Running complements coding really well"}]},{"type":"paragraph","content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam mmalesuada erat ut turpis. Suspendisse urna nibh viverra "},{"type":"text","marks":[{"type":"code"}],"text":"non semper"},{"type":"text","text":" suscipit posuere a pede. Donec nec justo eget felis facilisis fermentum. Aliquam "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://nos.nl"}}],"text":"porttitor"},{"type":"text","text":" mauris sit amet orci. Aenean dignissim pellentesque felis."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Running is better when you approach it as a team sport."}]}]},{"type":"paragraph","content":[{"type":"text","text":"There are several benefits to running:"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Fitness"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Being outdoor"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Happiness"}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Now, let me show you some code:"}]},{"type":"code_block","content":[{"type":"text","text":"return {\n  void(0);\n}"}]}]',
    'coding,running',
    1,
    1,
    1
  ),
  (
    'a-case-for-veganism',
    'Quisque volutpat mattis eros. Nullam mmalesuada erat ut turpis. Suspendisse urna nibh viverra',
    '[{"type":"title","content":[{"type":"text","text":"A case for veganism"}]},{"type":"paragraph","content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam mmalesuada erat ut turpis. Suspendisse urna nibh viverra "},{"type":"text","marks":[{"type":"code"}],"text":"non semper"},{"type":"text","text":" suscipit posuere a pede. Donec nec justo eget felis facilisis fermentum. Aliquam "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://nos.nl"}}],"text":"porttitor"},{"type":"text","text":" mauris sit amet orci. Aenean dignissim pellentesque felis."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Running is better when you approach it as a team sport."}]}]},{"type":"paragraph","content":[{"type":"text","text":"There are several benefits to running:"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Fitness"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Being outdoor"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Happiness"}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Now, let me show you some code:"}]},{"type":"code_block","content":[{"type":"text","text":"return {\n  void(0);\n}"}]}]',
    '[{"type":"title","content":[{"type":"text","text":"A case for veganism"}]},{"type":"paragraph","content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam mmalesuada erat ut turpis. Suspendisse urna nibh viverra "},{"type":"text","marks":[{"type":"code"}],"text":"non semper"},{"type":"text","text":" suscipit posuere a pede. Donec nec justo eget felis facilisis fermentum. Aliquam "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://nos.nl"}}],"text":"porttitor"},{"type":"text","text":" mauris sit amet orci. Aenean dignissim pellentesque felis."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Running is better when you approach it as a team sport."}]}]},{"type":"paragraph","content":[{"type":"text","text":"There are several benefits to running:"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Fitness"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Being outdoor"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Happiness"}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Now, let me show you some code:"}]},{"type":"code_block","content":[{"type":"text","text":"return {\n  void(0);\n}"}]}]',
    '',
    1,
    1,
    1
  ),
  (
    'work',
    'Gersom van Ginkel is a freelance front-end and full-stack JavaScript developer with 12+ years of experience.',
    '[{"type":"title","content":[{"type":"text","text":"Work"}]},{"type":"paragraph","content":[{"type":"text","text":"Here you''ll find a list of my previous work."}]}]',
    '[{"type":"title","content":[{"type":"text","text":"Work"}]},{"type":"paragraph","content":[{"type":"text","text":"Here you''ll find a list of my previous work."}]}]',
    '',
    1,
    0,
    0
  ),
  (
    'contact',
    'Curious about my availability? Any feedback on one of my posts? Get in contact through e-mail.',
    '[{"type":"title","content":[{"type":"text","text":"Contact"}]},{"type":"paragraph","content":[{"type":"text","text":"Please get in contact by "},{"type":"text","marks":[{"type":"dynamic_email"}],"text":"sending me an email"},{"type":"text","text":"."}]},{"type":"horizontal_rule"},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Other profiles"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"LinkedIn – "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://linkedin.com/in/gersom"}}],"text":"@gersom"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Github – "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://github.com/gersomvg"}}],"text":"@gersomvg"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Strava – "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://www.strava.com/athletes/gersom"}}],"text":"@gersom"}]}]}]}]',
    '[{"type":"title","content":[{"type":"text","text":"Contact"}]},{"type":"paragraph","content":[{"type":"text","text":"Please get in contact by "},{"type":"text","marks":[{"type":"dynamic_email"}],"text":"sending me an email"},{"type":"text","text":"."}]},{"type":"horizontal_rule"},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Other profiles"}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"LinkedIn – "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://linkedin.com/in/gersom"}}],"text":"@gersom"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Github – "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://github.com/gersomvg"}}],"text":"@gersomvg"}]}]},{"type":"list_item","content":[{"type":"paragraph","content":[{"type":"text","text":"Strava – "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://www.strava.com/athletes/gersom"}}],"text":"@gersom"}]}]}]}]',
    '',
    1,
    0,
    0
  );

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE posts;

DROP TABLE images;