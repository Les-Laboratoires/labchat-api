# Database Specs

## Extensions

```
uuid_generate_v4()
```

## Tables

### message

Message sent in channel

- id *uuid* (auto generated)
- content *String*
- author *ref: User*
- created_at *Datetime*

### channel

Channel in guild
