import os
import yaml
import pandas as pd


class Problem:
    ## should be a mongo engine object ?
    def __init__(self, filename: str):
        self.load(filename)

    def load(self, filename: str):
        """load problem from a yaml file"""

        with open(filename) as file:
            data = yaml.load(file, Loader=yaml.FullLoader)
            self.name = data.get("name")
            self.description = data.get("description")
            self.level = data.get("level", 1)
            self.author = data.get("author", "unknown")
            self.input_json = data.get("input", {})
            self.answer = data.get("answer", "")
            self.input_df = pd.read_json(self.input_json)

    @property
    def output_df(self):
        """Return predicted output from the answser"""
        return eval(self.answer, {"df": self.input_df})

    def save(self, filename: str):
        """save problem"""

        # TODO
        pass

    def to_html(self):
        """generate data camp html snippet
        @see https://github.com/datacamp/datacamp-light
        """

        input_str = str(self.input_df.to_dict())

        html = f"""
        <div data-datacamp-exercise data-show-run-button data-lang="python">
          <code data-type="pre-exercise-code">
            
            import pandas as pd 
            df = pd.DataFrame({input_str})

          </code>
          <code data-type="sample-code">
            # {self.description}

            result = ...

          </code>
          <code data-type="solution">
            # Create a variable a, equal to 5
            
            result = {self.answer}

          </code>
          <code data-type="sct">
            test_object("result")          
            success_msg("Great job!")
          </code>
          <div data-type="hint">
            TODO : create hint
          </div>
        </div>

        """

        return html

    def _to_static_page(self, filename: str):
        """for testing purpose : generate a html page"""

        html = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
         


            <script type="text/javascript" src="https://cdn.datacamp.com/dcl-react-prod/dcl-react.js.gz"></script>
        </head>
        <body>

        {self.to_html()}

        </body>
        </html>


        """

        with open(filename, "w") as file:
            file.write(html)


if __name__ == "__main__":

    p = Problem("problems/problem_1.yaml")

    print(p.input_df)
    print(p.output_df)

    p._to_static_page("problem_1.html")
