using System.Buffers;
using System.IO.Compression;
using System.IO.Pipelines;

namespace ProvingGrounds;

public static class Zip
{
    private static readonly Random Random = new Random(Seed: 123);

    // Write a zip file with specified number of files of 1MiB each with random content.
    public static async Task WriteAsync(PipeWriter writer, int files, CancellationToken cancellationToken)
    {
        // Unfortunately, ZipArchive doesn't have DisposeAsync, which leads to a synchronous flush
        // when disposing the archive. This will trigger an exception in ASP.NET Core, as sync
        // writes are discouraged. Using BodyWriter.AsStream() is a workaround for this,
        // but the real fix is using DisposeAsync once it's implemented.
        // See https://github.com/dotnet/runtime/issues/1560
        var stream = writer.AsStream();
        using var archive = new ZipArchive(stream, ZipArchiveMode.Create, leaveOpen: true);

        var buffer = ArrayPool<byte>.Shared.Rent(0x100000);

        try
        {
            for (var i = 0; i < files; i++)
            {
                Random.NextBytes(buffer);

                var name = i.ToString();
                var entry = archive.CreateEntry(name);

                await using var entryStream = entry.Open();

                await entryStream.WriteAsync(buffer, cancellationToken);
            }
        }
        finally
        {
            ArrayPool<byte>.Shared.Return(buffer);
        }
    }
}
