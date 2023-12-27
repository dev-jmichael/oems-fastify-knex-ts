import buildServer from "./server";

const server = buildServer();

const start = async () => {
  try {
    await server.listen({ 
      port: 8080,
      host: '0.0.0.0' 
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
