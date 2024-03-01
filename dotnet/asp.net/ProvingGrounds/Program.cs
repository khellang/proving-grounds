var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();

app.MapGet("/{files}", (int files, HttpResponse response) =>
{
    Zip.Write(response.Body, files);
});

app.Run();
