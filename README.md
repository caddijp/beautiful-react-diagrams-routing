# beautiful-react-diagrams-routing

![Node.js CI](https://github.com/caddijp/beautiful-react-diagrams-routing/workflows/Node.js%20CI/badge.svg)

## Install

    npm install caddijp/beautiful-react-diagrams-routing#build

## Usage

```typescript
  const [schema, { onChange }] = useSchema(
    redistribute(initialSchema || { nodes: [], links: [] })
  );

  return (
    <div style={{ height: "200rem" }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
```

## Contributing

PRs accepted.

## License

MIT © CADDi
