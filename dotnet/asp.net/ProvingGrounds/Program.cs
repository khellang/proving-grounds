using ProvingGrounds;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();

app.MapGet("/{files:int}", async (int files, HttpResponse response, CancellationToken cancellationToken) =>
{
    await Zip.WriteAsync(response.BodyWriter, files, cancellationToken);
});

app.Run();
