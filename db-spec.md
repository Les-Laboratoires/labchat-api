# Database Specs

## Sizings

- fat: **2048**
- big: **1024**
- medium: **64**
- little: **16**
- tiny: **8**

## Extensions

```
uuid_generate_v4()
```

## Tables

### interface \[globals]

- id *uuid* (auto generated)
- created_at *Datetime*

### message implements \[globals]

Message sent in channel (real markdown allowed)

- content *String* (fat)
- author *ref: user*
- channel *ref: mhannel*
- guild *ref: guild*

### embed

A grid

- id *uuid* (auto generated)
- message *ref: message*
- rows *Integer default: 1*
- cols *Integer default: 1*
- width *Integer* # pixel width of full grid
- height *Integer* # pixel height of full grid

### embed_component

A component to place on embed grid

- embed *ref: embed*
- content *String or null* (big) # URL for image, gif or video, text for content
- rows *Integer default: 1*
- cols *Integer default: 1*
- x *Integer*
- y *Integer*

### channel implements \[globals]

Channel in guild

- parent *ref: channel or null*
- name *String* (medium)
- guild *ref: guild*
- position *Integer*

### guild implements \[globals]

Guild like Discord Guilds

- name *String* (medium)
- icon *String* (big)
- owner *ref: user*

### user implements \[globals]

User account

- username *String* (medium)
- password *String* (medium)

### member implements \[globals]

Member of a guild

- guild *ref: guild*
- user *ref: user*
- nickname *String* (medium)

### role implements \[globals]

Role of a member

- parent *ref: role or null*
- name *String* (medium)
- user *ref: user*
- guild *ref: guild*
- color: *String* (little)
