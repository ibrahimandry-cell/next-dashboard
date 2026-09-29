import postgres from 'postgres';

// Initialize connection
const sql = postgres(
  process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL!,
  { ssl: 'require' },
);

export async function GET() {
  try {
    // Run a lightweight query that doesn't modify anything
    const result = await sql`SELECT NOW() as current_time, 1 as connected`;

    return Response.json({
      status: 'Success',
      message: 'Successfully connected to PostgreSQL!',
      timestamp: result[0].current_time,
    });
  } catch (error) {
    return Response.json(
      {
        status: 'Error',
        message: 'Failed to connect to PostgreSQL',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}