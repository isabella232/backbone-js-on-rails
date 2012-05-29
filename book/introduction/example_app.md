## The example application

The example application is a classic todo item manager.  This is a
popular example, and for good reason: The concepts and domain are familiar,
and room is left to explore interesting implementations like deferred
loading and file attachment.

The application uses Rails 3.1.0 and Ruby 1.9.3.  We provide an `.rvmrc`.

The included JavaScript libraries are non-minified for readability.  This
is a general good practice, and the Rails asset pipeline will properly package
the assets for production.

While Rails 3.1 provides the ability to write in CoffeeScript, we have decided
to make all of the example code normal JavaScript so as to reduce the number
of new things introduced at once.

The example application comes with a full test suite.  The README in the
`example_app` root directory has instructions for bootstrapping the app and
running all the tests.